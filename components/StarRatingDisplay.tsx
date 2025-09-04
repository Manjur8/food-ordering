import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface StarRatingProps {
  rating: number; // 0 to 5
  size?: number;
}

const StarRatingDisplay: React.FC<StarRatingProps> = ({ rating, size = 18 }) => {
  return (
    <View className="flex-row mb-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <FontAwesome
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={size}
          color="orange"
          style={{ marginRight: 2 }}
        />
      ))}
      <Text className="text-gray-200 ml-2">{rating.toFixed(1)}</Text>
    </View>
  );
};

export default StarRatingDisplay;