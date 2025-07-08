import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

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
    menuCustomizationsCollectionId: '686a503a00246f389a13'
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

export async function signIn(email: string, password: string) {
    try {
        await account.createEmailPasswordSession(email, password);

        const accountDetails = await account.get();
        const avatarUrl = avatar.getInitials(accountDetails.name).toString();
        return {...accountDetails, avatar: avatarUrl}

    } catch (error) {
        throw new Error(error as string)
    }
}

export async function signUp(email: string, password: string, name: string) {
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