import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { Box, useTheme } from "native-base"
import { AuthRoutes } from "./auth.routes";
import { Home } from "@screens/Home";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SingUp";
import { ProductDetails } from "@screens/ProductDetails";
import { MyProducts } from "@screens/MyProducts";

export function Routes() {

    const theme = DefaultTheme;
    const { colors } = useTheme();

    theme.colors.background = colors.gray[200];

    return (
        <Box flex={1}>
            <NavigationContainer theme={theme}>
                <MyProducts />
            </NavigationContainer>
        </Box>
    )
}