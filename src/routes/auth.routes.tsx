import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SingUp";

type AuthNavigationProps = {
    SignIn: undefined;
    SignUp: undefined;
}

export type AuthNavigationRoutesProps = NativeStackNavigationProp<AuthNavigationProps>;

export function AuthRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator<AuthNavigationProps>();
    return (
        <Navigator
            initialRouteName="SignIn"
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="SignIn"
                component={SignIn}
            />
            <Screen
                name="SignUp"
                component={SignUp}
            />
        </Navigator>
    )
}