import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { Box, useTheme } from "native-base"
import { AuthRoutes } from "./auth.routes";

export function Routes() {

    const theme = DefaultTheme;
    const { colors } = useTheme();

    theme.colors.background = colors.gray[200];

    return (
        <Box flex={1}>
            <NavigationContainer theme={theme}>
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    )
}