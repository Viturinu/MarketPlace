import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { Box, useTheme } from "native-base"
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { AppRoutesNativeStack } from "./app.routes.nativestack";

export function Routes() {

    const { user, isLoadingUserStorageData } = useAuth();

    const theme = DefaultTheme;
    const { colors } = useTheme();

    theme.colors.background = colors.gray[200];

    if (isLoadingUserStorageData) return <Loading />

    return (
        <Box flex={1}>

            <NavigationContainer theme={theme}>
                {user.id ? <AppRoutesNativeStack /> : <AuthRoutes />}
            </NavigationContainer>

        </Box>
    )
}