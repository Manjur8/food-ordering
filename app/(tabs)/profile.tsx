import CustomButton from '@/components/CustomButton';
import ProfileImageModal from '@/components/ProfileImageModal';
import { signOut, updateProfilePicture } from '@/lib/appWrite';
import useAuthStore from '@/store/auth.store';
import { getProfilePic } from '@/utils/getProfilePic';
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const { setAuthenticated, user, setUser  } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const defaultAvatar = user?.avatar + `?name=${user?.name}`;

  // Update Profile Picture
  const handleUpdatePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.7,
        cameraType: ImagePicker.CameraType.front
      });

      if (!result.canceled) {
        const file = result.assets[0];
        const selectedImage = {name: file.fileName!, type: file.mimeType!, size: file.fileSize!, uri: file.uri}
        // upload to AppWrite
        const updatedProfilePicture = await updateProfilePicture(selectedImage, user!.$id);

        setUser({...user!, avatar: updatedProfilePicture.avatar.toString()}); // update global state
        setModalVisible(false);
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  // Delete Profile Picture
  const handleDeletePicture = async () => {
    // try {
    //   const updatedUser = await deleteProfilePicture(user.$id);
    //   setUser(updatedUser); // set avatar = null/default
    //   setModalVisible(false);
    // } catch (err: any) {
    //   Alert.alert("Error", err.message);
    // }
  };


  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
        await signOut();
        setAuthenticated(null)
        router.replace('/sign-in');
    } catch(error: any) {
        Alert.alert('Error', error.message);
    } finally {
        setIsLoggingOut(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={{ uri: getProfilePic(user?.avatar as string, user!)}} // Replace with dynamic user image
          className="w-32 h-32 rounded-full border-2 border-gray-300 mb-6"
          resizeMode="cover"
          />
      </TouchableOpacity>
      <Text className="text-2xl font-semibold mb-6">{user?.name}</Text>

      {/* <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-medium text-base">Log Out</Text>
      </TouchableOpacity> */}

      <CustomButton
        title="Log Out" style={"bg-primary"}
        isLoading={isLoggingOut}
        onPress={handleLogout}
      />

      {/* Profile Picture Modal */}
      <ProfileImageModal
        visible={modalVisible}
        imageUri={user?.avatar || defaultAvatar}
        onClose={() => setModalVisible(false)}
        onUpdate={handleUpdatePicture}
        onDelete={handleDeletePicture}
      />
    </View>
  );
}
