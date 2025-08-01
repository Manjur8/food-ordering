import { TextInputProps } from "react-native";

interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
}

export interface CustomInputProps extends TextInputProps {
  label: string;
  billInfo?: boolean
}
export interface TabBarIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}

interface User extends Models.Document {
    $id: string,
    name: string;
    email: string;
    avatar: string;
}

interface CartCustomization {
    id: string;
    name: string;
    price: number;
    type: string;
}
interface CartStore {
    items: CartItemType[];
    addItem: (item: Omit<CartItemType, "quantity">) => void;
    removeItem: (id: string, customizations: CartCustomization[]) => void;
    increaseQty: (id: string, customizations: CartCustomization[]) => void;
    decreaseQty: (id: string, customizations: CartCustomization[]) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

interface Category extends Models.Document {
    $id: string;
    name: string;
    description: string;
}

export interface MenuItem extends Models.Document {
    $id: string;
    name: string;
    price: number;
    image_url: string;
    description: string;
    calories: number;
    protein: number;
    rating: number;
    type: string;
}

interface GetMenuParams {
    category: string;
    query: string;
}

interface CartItemType {
    id: string; // menu item id
    name: string;
    price: number;
    image_url: string;
    quantity: number;
    customizations?: CartCustomization[];
}

interface CustomHeaderProps {
    title?: string;
}

interface PaymentInfoStripeProps {
    label: string;
    value: string;
    labelStyle?: string;
    valueStyle?: string;
}

interface BillingInformationType {
    fullName: string;
    phone: string;
    address: string;
    pinCode: string;
}

type CartViewType = 'payment-summary' | 'billing-information'

interface BillingInformationProps {
    setCartView: React.Dispatch<React.SetStateAction<CartViewType>>
}

interface CheckoutScreenProps {
    billingInformation: BillingInformationType,
    setCartView: React.Dispatch<React.SetStateAction<CartViewType>>
}