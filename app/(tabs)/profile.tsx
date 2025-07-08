import CustomButton from '@/components/CustomButton';
// import { signOut } from '@/lib/appwrite';
// import useAuthStore from '@/store/auth.store';
// import { router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';

export default function Profile() {
  // const { user  } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
        // await signOut();
        // router.replace('/sign-in');
    } catch(error: any) {
        Alert.alert('Error', error.message);
    } finally {
        setIsLoggingOut(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Image
        source={{ uri: 'https://i.pravatar.cc/300' }} // Replace with dynamic user image
        className="w-32 h-32 rounded-full border-2 border-gray-300 mb-6"
        resizeMode="cover"
      />
      <Text className="text-2xl font-semibold mb-6">John Doe</Text>

      {/* <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-medium text-base">Log Out</Text>
      </TouchableOpacity> */}

      <CustomButton
        title="Log Out" style={"bg-red-500"}
        isLoading={isLoggingOut}
        onPress={handleLogout}
      />
    </View>
  );
}
