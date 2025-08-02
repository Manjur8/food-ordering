import BillingInformation from "@/components/BillingInformation";
import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import PaymentSummary from "@/components/PaymentSummary";
import { useCartStore } from "@/store/cart.store";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
    const { items, getTotalItems } = useCartStore();
    
    const [cartView, setCartView] = useState<'payment-summary' | 'billing-information'>('payment-summary')

    const totalItems = getTotalItems();

    return (
        <SafeAreaView className="bg-white h-full">
          {
            cartView === 'payment-summary' ?
            <FlatList
                data={items}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
                ListEmptyComponent={() => <Text>Cart Empty</Text>}
                ListFooterComponent={() => totalItems > 0 && (
                    <View className="gap-5">
                        <PaymentSummary />

                        <CustomButton title="Proceed" onPress={() => {setCartView('billing-information')}} />
                    </View>
                )}
            />
            : <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled"> 
                  <View className=" pb-28 px-5 pt-5 gap-5">
                    <PaymentSummary />
                    <BillingInformation {...{setCartView}} />
                  </View>
                </ScrollView>
            </KeyboardAvoidingView>
          }
        </SafeAreaView>
    )
}

export default Cart