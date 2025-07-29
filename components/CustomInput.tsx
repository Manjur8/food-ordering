import { CustomInputProps } from "@/type";
import cn from "clsx";
import { useState } from "react";
import { Text, TextInput, View } from 'react-native';

const CustomInput = ({
    placeholder = 'Enter text',
    value,
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType="default",
    billInfo=false,
    ...rest
}: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="w-full">
            <Text className={billInfo ? 'bill-info-label' : "label"}>{label}</Text>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                placeholderTextColor="#888"
                className={cn(billInfo? 'bill-info-input' : 'input', isFocused ? 'border-primary' : 'border-gray-300')}
                {...rest}
            />
        </View>
    )
}
export default CustomInput
