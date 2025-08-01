import useAuthStore from '@/store/auth.store';
import { BillingInformationProps } from '@/type';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CheckoutScreen from './CheckoutScreen';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

const BillingInformation = ({setCartView}: BillingInformationProps) => {
  const authUser = useAuthStore()

  const [billingInformation, setBillingInformation] = useState({
    fullName: authUser.user?.name || '',
    phone: '',
    address: '',
    pinCode: ''
  })

  const inputChangeHandler = (field: string, value: string) => {
    setBillingInformation(prev => ({...prev, [field]: value}))
  }
  return (
    <>
    {/* className="gap-10 bg-white rounded-lg p-5 mt-5" */}
        <View className="gap-5 mt-5 border border-gray-200 p-5 rounded-2xl">
        <Text className="h3-bold text-dark-100">
            Billing Information
        </Text>

        {/* Full Name */}
        <CustomInput
            value={billingInformation.fullName}
            onChangeText={(value) => inputChangeHandler('fullName', value)}
            placeholder="John Doe"
            label='Full Name'
            billInfo
        />

        {/* Phone */}
        <CustomInput
            value={billingInformation.phone}
            onChangeText={(value) => inputChangeHandler('phone', value)}
            placeholder="e.g. 9876******"
            keyboardType="phone-pad"
            label='Phone Number'
            billInfo
        />

        {/* Address */}
        <CustomInput
            value={billingInformation.address}
            onChangeText={(value) => inputChangeHandler('address', value)}
            placeholder="House No, Street, City"
            label="Delivery Address"
            multiline
            numberOfLines={3}
            billInfo
        />

        {/* Pin Code */}
        <CustomInput
            value={billingInformation.pinCode}
            onChangeText={(value) => inputChangeHandler('pinCode', value)}
            placeholder="700***"
            label='Pincode'
            keyboardType="phone-pad"
            billInfo
        />
        </View>
        <CustomButton title="Edit Card" onPress={() => {setCartView('payment-summary')}} />
        <CheckoutScreen {...{billingInformation, setCartView}} />
    </>
  )
}

export default BillingInformation