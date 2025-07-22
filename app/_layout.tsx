import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import 'react-native-reanimated';
import "./globals.css";

import useAuthStore from '@/store/auth.store';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect } from 'react';

export default function RootLayout() {
  const {isLoading, fetchAuthenticatedUser} = useAuthStore()
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('@/assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('@/assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('@/assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('@/assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('@/assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!fontsLoaded && isLoading) {
    // Async font loading only occurs in development.
    return null;
  }

   return <StripeProvider
              publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
              merchantIdentifier="merchant.foodordering.com" // required for Apple Pay
              urlScheme="foodordering" // required for 3D Secure and bank redirects
            >
              <Stack screenOptions={{ headerShown: false }} />
            </StripeProvider>;
}
