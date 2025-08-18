import useAuthStore from "@/store/auth.store";
import { ProfileImageModalProps } from "@/type";
import { getProfilePic } from "@/utils/getProfilePic";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({
  visible,
  imageUri,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const { user  } = useAuthStore();
  
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/70 items-center justify-center">
        <Image
          source={{ uri: getProfilePic(imageUri, user!) }}
          className="w-64 h-64 rounded-full border-2 border-white mb-6"
          resizeMode="cover"
        />

        <View className="flex-row gap-4">
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-2xl"
            onPress={onUpdate}
          >
            <Text className="text-white font-semibold">Update</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-2xl"
            onPress={onDelete}
          >
            <Text className="text-white font-semibold">Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-500 px-4 py-2 rounded-2xl"
            onPress={onClose}
          >
            <Text className="text-white font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileImageModal;
