import { useAuth } from "@hooks/useAuth";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { Home } from "@screens/Home";
import { MyProducts } from "@screens/MyProducts";
import { ProductDetails } from "@screens/ProductDetails";
import { useTheme } from "native-base";
import { House, SignOut, Tag } from "phosphor-react-native";
import { Platform, TouchableOpacity } from "react-native";
import { AppRoutes, AppRoutesProps } from "./app.routes";
import { useNavigation } from "@react-navigation/native";

type AppRoutes = {
    home: undefined;
    myProductsTabNavigation: undefined;
    signOut: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export type AppRoutesMyProductsProps = BottomTabNavigationProp<AppRoutes>;

export function MyPProductsRoutes() {

    const { sizes, colors } = useTheme(); //hooks precisam estar dentro de uma função (fora do return, a gente não tem acesso ao theme do nativebase, por isso precisamos desestruturar e chamar)

    const navigation = useNavigation<AppRoutesProps>()

    return (
        <Navigator
            initialRouteName="myProductsTabNavigation"
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
                name="myProductsTabNavigation"
                component={MyProducts}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Tag size={20} weight="bold" color={color} />
                    )
                }}
            />
            <Screen
                name="signOut"
                component={() => (navigation.goBack())}
                options={{
                    tabBarIcon: () => (
                        <SignOut size={20} weight="bold" color={colors.red[300]} />
                    )
                }}
            />
        </Navigator>
    )
}