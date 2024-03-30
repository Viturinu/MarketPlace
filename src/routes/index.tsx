import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { Box, useTheme } from "native-base"
import { AuthRoutes } from "./auth.routes";
import { Home } from "@screens/Home";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SingUp";
import { ProductDetails } from "@screens/ProductDetails";
import { MyProducts } from "@screens/MyProducts";
import { ProductStatus } from "@screens/ProductStatus";
import { ProductPreview } from "@screens/ProductPreview";
import { NewProduct } from "@screens/NewProduct";
import { EditProduct } from "@screens/EditProduct";

export function Routes() {

    const theme = DefaultTheme;
    const { colors } = useTheme();

    theme.colors.background = colors.gray[200];

    return (
        <Box flex={1}>
            <NavigationContainer theme={theme}>
                <EditProduct />
            </NavigationContainer>
        </Box>
    )
}