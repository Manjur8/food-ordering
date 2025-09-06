import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
    onPress,
    title="Click Me",
    style,
    textStyle,
    leftIcon,
    isLoading = false,
    variant = "primary",
}: CustomButtonProps) => {
    const isPrimary = variant === "primary"
    const primaryStyle = "bg-primary text-white border-0";
    const secondaryStyle = "bg-white border border-gray-300 text-black";
    return (
        <TouchableOpacity className={cn('custom-btn', isPrimary ? primaryStyle : secondaryStyle, isLoading ? "opacity-50" : "", style)} disabled={isLoading} onPress={onPress}>
            {leftIcon}

            <View className="flex-center flex-row">
                {isLoading ? (
                    <ActivityIndicator size="small" color={isPrimary ? "white" : "black"} />
                ): (
                    <Text className={cn('paragraph-semibold', isPrimary ? "text-white-100" : "text-black-100", textStyle)}>
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton