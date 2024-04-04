import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { Home } from "@screens/Home";
import { useTheme } from "native-base";
import { Platform } from "react-native";

type AppRoutes = {
    home: undefined;
    products: undefined;
    signOut: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export type AppRoutesProps = BottomTabNavigationProp<AppRoutes>;

export function AppRoutes() {

    const { sizes, colors } = useTheme(); //hooks precisam estar dentro de uma função (fora do return, a gente não tem acesso ao theme do nativebase, por isso precisamos desestruturar e chamar)

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.gray[100],
                    borderTopWidth: 0,
                    height: Platform.OS === "android" ? "auto" : 96,
                    paddingBottom: sizes[10],
                    paddingTop: sizes[6]
                }
            }}
        >
            <Screen
                name="home"
                component={Home}

            />
        </Navigator>
    )
}