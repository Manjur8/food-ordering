import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Cart() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-red-500">
        Cart Screen
      </Text>
    </SafeAreaView>
  );
}