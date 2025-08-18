import { GetMenuParams } from '@/type';
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const appWriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: 'com.manjur.foodordering',
    databaseId: '686902be002499ceba91',
    bucketId: '6869046e00197673d156',
    userCollectionId: '686903d70036f28474cd',
    categoriesCollectionId: '686903f900206218e366',
    menuCollectionId: '6869041800116af0bdcd',
    customizationsCollectionId: '68690432000226b1deca',
    menuCustomizationsCollectionId: '686a503a00246f389a13',
    ordersCollectionId: '688614d70014b8409e7a',
}

let client: Client;
client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)   // Your Project ID
  .setPlatform(appWriteConfig.platform);   // Your package name / bundle identifier


export const account = new Account(client);
const databases = new Databases(client);
const avatar = new Avatars(client);
const storage = new Storage(client);

export async function signIn(email: string, password: string) {
    try {
        await account.createEmailPasswordSession(email, password);

        const accountDetails = await account.get();
        const avatarUrl = avatar.getInitialsURL(accountDetails.name).toString();
        return {...accountDetails, avatar: avatarUrl}

    } catch (error) {
        throw new Error(error as string)
    }
}

export async function createUser(email: string, password: string, name: string) {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) throw new Error

        await signIn(email, password);

        const avatarUrl = avatar.getInitialsURL(name);

        await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            { name, email, accountId: newAccount.$id, avatar: avatarUrl }
        );

    } catch (err) {
        throw new Error(err as string)
    }
    return await account.get();
}

export async function signOut() {
    try {
        await account.deleteSessions();
    } catch (error) {
        throw new Error(error as string)
    }
}

export async function getCurrentUser() {
    try {

        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appWriteConfig.databaseId, // databaseId
            appWriteConfig.userCollectionId, // collectionId
            [Query.equal('accountId', currentAccount.$id)] // queries (optional)
        );
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (err) {
        throw new Error(err as string)
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const createOrder = async ({
  userId,
  cartItems,
  totalPrice,
  paymentId,
}: {
  userId: string;
  cartItems: any[];
  totalPrice: number;
  paymentId?: string;
}) => {
  try {
    const res = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.ordersCollectionId,
      ID.unique(),
      {
        user_id: userId,
        items: JSON.stringify(cartItems),
        total_price: totalPrice,
        payment_id: paymentId || '',
        // createdAt: new Date().toISOString(),
      }
    );

    return res;
  } catch (error) {
    console.error('❌ Failed to create order', error);
    throw error;
  }
};

export const updateProfilePicture = async (uri: {name: string, type: string, size: number, uri: string}, userId: string) => {
  // upload file
  const response = await storage.createFile(appWriteConfig.bucketId, ID.unique(), uri);

  // get file preview url
//   const fileUrl = storage.getFilePreviewURL(appWriteConfig.bucketId, response.$id);
  const fileUrl = storage.getFileViewURL(appWriteConfig.bucketId, response.$id);

//   const avatarUrl = (fileUrl as unknown as string)?.replace('preview', 'view')

  // update user document with new avatar
  await databases.updateDocument(appWriteConfig.databaseId, appWriteConfig.userCollectionId, userId, { avatar: fileUrl });

  return { ...response, avatar: fileUrl };
};

export const deleteProfilePicture = async (userId: string) => {
  // set avatar to null in database
  await databases.updateDocument(appWriteConfig.databaseId, appWriteConfig.userCollectionId, userId, { avatar: null });

  return { avatar: null };
};
