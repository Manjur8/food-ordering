import { createOrder } from "@/lib/appWrite";
import useAuthStore from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { CheckoutScreenProps } from "@/type";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import CustomButton from "./CustomButton";

export default function CheckoutScreen({billingInformation, setCartView}: CheckoutScreenProps) {
  const authUser = useAuthStore()
  const { clearCart, items, getTotalPrice } = useCartStore()

  const totalPrice = getTotalPrice();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

//   const [publishableKey, setPublishableKey] = useState('');

  const [success, setSuccess] = useState(false)


  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`/(api)/(stripe)/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: authUser.user?.name,
        email: authUser.user?.email,
        amount: totalPrice.toFixed(2)
      })
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Food Ordering App",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: billingInformation.fullName,
        phone: billingInformation.phone,
      }
    });
    if (!error) {
      setLoading(true);
    }
    return {paymentIntent}
  };

  const openPaymentSheet = async () => {
    try {
      const { paymentIntent } = await initializePaymentSheet()
      const { error } = await presentPaymentSheet();
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        setLoading(false)
      } else {
        const cartItems = items.map(item => ({name: item.name, price: item.price, quantity: item.quantity, image_url: item.image_url}))
        await createOrder({userId: authUser.user!.$id, cartItems, totalPrice, paymentId: paymentIntent})
        router.replace('/order-confirmation')
        clearCart()
        setCartView('payment-summary')
        setLoading(false)
      }
    } catch (err: any) {
      Alert.alert('Payment Error: ', err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  const orderHandler = async () => {
    if (!billingInformation.fullName || !billingInformation.phone || !billingInformation.address || !billingInformation.pinCode) {
      return Alert.alert('Missing Info', 'Please fill in all fields.');
    }
    await openPaymentSheet()
  }

  
    // const fetchPublishableKey = async () => {
    //   // const key = await fetchKey(); // fetch key from your server here
    //   // setPublishableKey(key);
    // };
  
    // useEffect(() => {
    //   fetchPublishableKey();
    // }, []);

  return (
        <CustomButton title="Order Now" onPress={orderHandler} isLoading={loading} />
  );
}