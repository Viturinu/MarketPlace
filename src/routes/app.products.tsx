import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { EditProduct } from "@screens/EditProduct";
import { Home } from "@screens/Home";
import { NewProduct } from "@screens/NewProduct";
import { ProductDetails } from "@screens/ProductDetails";
import { ProductPreview } from "@screens/ProductPreview";
import { useTheme } from "native-base";

type ProductsRoutes = {
    create: undefined;
    myProducts: undefined;
    newProduct: undefined;
    productPreview: undefined;
    productDetails: undefined;
    editProduct: undefined;

}

const { Navigator, Screen } = createNativeStackNavigator<ProductsRoutes>();

export type AppProductsProps = NativeStackNavigationProp<ProductsRoutes>;

export function ProductsRoutes() {

    const { sizes, colors } = useTheme(); //hooks precisam estar dentro de uma função (fora do return, a gente não tem acesso ao theme do nativebase, por isso precisamos desestruturar e chamar)

    return (
        <Navigator
            initialRouteName="create"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="create"
                component={Home}
            />
            <Screen
                name="myProducts"
                component={NewProduct}
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