import { appWriteConfig, getProduct } from "@/lib/appWrite";
import useAppwrite from "@/lib/useAppwrite";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import CartButton from "./CartButton";
import CustomButton from "./CustomButton";
import StarRatingDisplay from "./StarRatingDisplay";

const ViewFood = () => {
    const imageUrl = `https://nyc.cloud.appwrite.io/v1/storage/buckets/6869046e00197673d156/files/686a60fe002dc710bc4d/view?project=${appWriteConfig.projectId}`;
    const {data} = useAppwrite({fn: () => getProduct("686a614700351825be06")});

    // console.log(data)
    return (
        <View className="flex-1 bg-white">
        <ScrollView className="flex-1 bg-white p-4">

            <View className="flex-between flex-row w-full mb-4">
                <View className="flex-start">
                    {/* <Text className="small-bold uppercase text-primary">Search</Text>
                    <View className="flex-start flex-row gap-x-1 mt-0.5">
                        <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                    </View> */}
                    {/* 1. Food Name */}
                    <Text className="text-2xl font-bold mb-0 text-gray-800">
                        Grilled Chicken Burger
                    </Text>
                </View>

                <CartButton />
            </View>


        {/* 2. Left Info + Right Image */}
        <View className="flex-row justify-between mb-6">
            {/* Left Info */}
            <View className="flex-col space-y-2">
                <Text className="text-gray-200 mb-2">Burger</Text>
                <StarRatingDisplay rating={3.0} />
                <Text className="text-gray-800 text-2xl font-bold mb-4">$8.99</Text>
                <View className="flex-row justify-between items-center mb-6 gap-5">
                    <View>
                        <Text className="text-lg text-gray-200">🔥 Calories</Text>
                        <Text className="text-gray-700 font-bold">450 kcal</Text>
                    </View>
                    <View>
                        <Text className="text-lg text-gray-200">🥩 Protein</Text>
                        <Text className="text-gray-700 font-bold">25g</Text>
                    </View>
                </View>
            </View>

            {/* Right Image */}
            <Image
            source={{ uri: imageUrl }}
            className="w-60 h-60 rounded-xl"
            />
            {/* <Image source={{uri: "https://nyc.cloud.appwrite.io/v1/storage/buckets/6869046e00197673d156/files/686a60fe002dc710bc4d/view"}} className={"size-full"} resizeMode={"contain"} /> */}
        </View>

        {/* 3. Delivery Information */}
        <View className="bg-[#fcf0e1] p-4 rounded-xl mb-6 border-radius-40">
            <View className="flex-row justify-between">
            <Text className="text-gray-700">🚚 Free Delivery</Text>
            <Text className="text-gray-700">20 - 30 mins</Text>
            <Text className="text-gray-700">⭐ 4.5</Text>
            </View>
        </View>

        {/* 4. Food Description */}
        <View>
            <Text className="text-lg font-semibold mb-2">📝 Description</Text>
            <Text className="text-gray-700 leading-6">
            This grilled chicken burger is made with tender chicken breast, 
            fresh veggies, and our secret sauce. Perfect for a quick bite 
            or a filling meal.
            </Text>
        </View>

        </ScrollView>
        {/* Sticky bottom bar */}
        <View className="absolute bottom-0 left-5 right-5 flex-row bg-white p-4 gap-2"
            style={{
                borderRadius: 50,
                height: 80,
                shadowColor: '#1a1a1a',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
                overflow: "hidden", // 🔑 prevents double-layer look
            }}
        >
            <CustomButton
            title="Add to Cart"
            variant="secondary"
            style="w-[50%]"
            onPress={() => {}}
            />
            <CustomButton
            title="Buy Now"
            variant="primary"
            style="w-[50%]"
            onPress={() => {}}
            />
        </View>

        </View>
    );
};

export default ViewFood;