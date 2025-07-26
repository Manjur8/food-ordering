import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const OrderSuccess = () => {
//   const navigation = useNavigation();

  const handleViewOrder = () => {
    // navigation.navigate("OrderDetails"); // 🔁 Change this to your actual route
  };

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <Ionicons name="checkmark-circle" size={100} color="#22C55E" className="mb-6" />

      <Text className="text-2xl font-semibold text-black text-center mb-2">
        Order Placed Successfully
      </Text>

      <Text className="text-base text-gray-600 text-center mb-8">
        Thank you for your purchase!
      </Text>

      <TouchableOpacity
        className="bg-green-500 px-8 py-3 rounded-lg"
        onPress={handleViewOrder}
      >
        <Text className="text-white text-base font-semibold">View Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccess;
