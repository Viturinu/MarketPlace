import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { EditProduct } from "@screens/EditProduct";
import { Home } from "@screens/Home";
import { MyProducts } from "@screens/MyProducts";
import { NewProduct } from "@screens/NewProduct";
import { ProductDetails } from "@screens/ProductDetails";
import { ProductPreview } from "@screens/ProductPreview";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import { MyPProductsRoutes } from "./app.myproducts";

type AppRoutes = {
    home: undefined;
    myProducts: undefined;
    newProduct: undefined;
    productPreview: undefined;
    productDetails: undefined;
    editProduct: undefined;

}

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export type AppRoutesProps = NativeStackNavigationProp<AppRoutes>;

export function AppRoutes() {

    const { sizes, colors } = useTheme(); //hooks precisam estar dentro de uma função (fora do return, a gente não tem acesso ao theme do nativebase, por isso precisamos desestruturar e chamar)

    return (
        <Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="home"
                component={Home}
            />
            <Screen
                name="myProducts"
                component={MyPProductsRoutes}
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