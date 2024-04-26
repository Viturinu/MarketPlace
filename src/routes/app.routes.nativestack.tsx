import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { EditProduct } from "@screens/EditProduct";
import { NewProduct } from "@screens/NewProduct";
import { ProductDetails } from "@screens/ProductDetails";
import { ProductPreview } from "@screens/ProductPreview";
import { useTheme } from "native-base";
import { AppRoutesBottomTab } from "./app.routes.bottomtab";
import { MyProducts } from "@screens/MyProducts";
import { photoFileProps, productsProps } from "@dtos/ProductDTO";

type AppRoutesNativeStack = {
    BottomTabNavigator: undefined;
    myProducts: undefined;
    newProduct: undefined;
    productPreview: {
        images: photoFileProps[];
        name: string;
        description: string;
        is_new: string;
        price: string;
        accept_trade: boolean;
        payment_methods: string[];
    };
    productDetails: productsProps;
    productStatus: productsProps;
    editProduct: undefined;

}

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesNativeStack>();

export type AppRoutesNativeStackProps = NativeStackNavigationProp<AppRoutesNativeStack>;

export function AppRoutesNativeStack() {

    return (
        <Navigator
            initialRouteName="BottomTabNavigator"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="BottomTabNavigator"
                component={AppRoutesBottomTab}
            />
            <Screen
                name="myProducts"
                component={MyProducts}
            />
            <Screen
                name="newProduct"
                component={NewProduct}
            />
            <Screen
                name="productPreview"
                component={ProductPreview}
            />
            <Screen
                name="productDetails"
                component={ProductDetails}
            />
            <Screen
                name="editProduct"
                component={EditProduct}
            />

        </Navigator>
    )
}