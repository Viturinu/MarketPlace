import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { Home } from "@screens/Home";
import { MyProducts } from "@screens/MyProducts";
import { useTheme } from "native-base";
import { House, SignOut, Tag } from "phosphor-react-native";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNativeStackProps } from "./app.routes.nativestack";
import { ProductDetails } from "@screens/ProductDetails";

type AppRoutesBottomTab = {
    home: undefined;
    myproducts: undefined;
    signOut: undefined;
    navigateToProductsNavigation: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesBottomTab>();

export type AppRoutesBottomTabProps = BottomTabNavigationProp<AppRoutesBottomTab>;

export function AppRoutesBottomTab() {

    const { sizes, colors } = useTheme(); //hooks precisam estar dentro de uma função (fora do return, a gente não tem acesso ao theme do nativebase, por isso precisamos desestruturar e chamar)

    const navigation = useNavigation<AppRoutesNativeStackProps>()

    return (
        <Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: colors.gray[300],
                tabBarActiveTintColor: colors.gray[500],
                tabBarStyle: {
                    backgroundColor: colors.gray[100],
                    borderTopWidth: 0,
                    height: Platform.OS === "android" ? "auto" : 96,
                    paddingBottom: sizes[8],
                    paddingTop: sizes[6]
                }
            }}
        >
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <House size={20} weight="bold" color={color} />
                    ),
                }}
            />
            <Screen
                name="myproducts"
                component={MyProducts}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Tag size={20} weight="bold" color={color} />
                    )
                }}
            />
            <Screen
                name="signOut"
                component={ProductDetails}
                options={{
                    tabBarActiveTintColor: colors.red[700],
                    tabBarInactiveTintColor: colors.red[300],
                    tabBarIcon: ({ color }) => (
                        <SignOut size={20} weight="bold" color={color} />
                    )
                }}
            />
        </Navigator>
    )
}