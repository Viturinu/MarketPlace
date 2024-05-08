import { Header } from "@components/Header";
import { ProductCard } from "@components/ProductCard";
import { Box, Text, HStack, Select, CheckIcon, FlatList, Center, Image, Skeleton, VStack, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppRoutesNativeStackProps } from "@routes/app.routes.nativestack";
import { api } from "@services/api";
import { productsProps } from "@dtos/ProductDTO";
import { AppError } from "@utils/AppError";

export function MyProducts() {

    const navigationStack = useNavigation<AppRoutesNativeStackProps>();

    const [activityStatus, setActivityStatus] = useState("Todos"); //precisa pois o Select tem um value, então precisamos colocar esse estado

    const [isLoading, setIsLoading] = useState(true);

    const [productsArray, setProductArray] = useState<productsProps[]>([] as productsProps[]);

    const toast = useToast();

    const navigation = useNavigation<AppRoutesNativeStackProps>();

    async function handleActivityFilter(itemValue: string) {
        try {
            setIsLoading(true);
            setActivityStatus(itemValue);

            if (itemValue === "Todos") {
                const response = await api.get("/users/products");
                setProductArray(response.data);
            }
            else if (itemValue === "Ativos") {
                const response = await api.get("/users/products");
                const newProductsArray = response.data.filter(item => item.is_active)
                setProductArray(newProductsArray);
            }
            else {
                const response = await api.get("/users/products");
                const newProductsArray = response.data.filter(item => !item.is_active)
                setProductArray(newProductsArray);
            }
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível realizar essa operação agora."

            toast.show({
                title,
                placement: "top",
                bgColor: "red.700"
            })
        }
        finally {
            setIsLoading(false);
        }
    }

    async function updateMyProducts() {
        try {
            setIsLoading(true);
            const response = await api.get("/users/products");
            setProductArray(response.data);

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível realizar essa operação agora."

            toast.show({
                title,
                placement: "top",
                bgColor: "red.700"
            })
        }
        finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        updateMyProducts();
    }, []))

    return (
        <Box
            backgroundColor="gray.200"
            paddingX={4}
            flex={1}
        >
            <Header
                title="Meus anúncios"
                rightIcon="plus"
                rightIconFunction={() => navigation.navigate("newProduct")}
            />

            <HStack
                justifyContent="space-between"
                alignItems="center"
                mt={6}
            >
                <Text
                    fontSize="sm"
                    fontFamily="body"
                    color="gray.600"
                    ml={2}
                >
                    {productsArray.length} anúncios
                </Text>
                <Box>
                    <Select selectedValue={activityStatus} width={110} height={8} accessibilityLabel="Todos" placeholderTextColor="gray.600" placeholder="Todos" _selectedItem={{
                        bg: "gray.200",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => handleActivityFilter(itemValue)}>
                        <Select.Item label="Todos" value="Todos" />
                        <Select.Item label="Ativos" value="Ativos" />
                        <Select.Item label="Inativos" value="Inativos" />
                    </Select>
                </Box>
            </HStack>
            <Box
                flex={1}
            >
                {
                    isLoading ?
                        <VStack
                            flex={1}
                            mt={3}
                        >
                            <HStack
                                space={2}
                            >
                                <Skeleton
                                    width={34}
                                    height={24}
                                    startColor="gray.400"
                                    endColor="gray.300"
                                    rounded={6}
                                />
                                <Skeleton
                                    width={34}
                                    height={24}
                                    startColor="gray.400"
                                    endColor="gray.300"
                                    rounded={6}
                                />
                            </HStack>
                            <HStack
                                mt={2}
                                space={2}
                            >
                                <Skeleton
                                    width={34}
                                    height={24}
                                    startColor="gray.400"
                                    endColor="gray.300"
                                    rounded={6}
                                />
                                <Skeleton
                                    width={34}
                                    height={24}
                                    startColor="gray.400"
                                    endColor="gray.300"
                                    rounded={6}
                                />
                            </HStack>
                        </VStack>
                        : <FlatList
                            data={productsArray}
                            numColumns={2}
                            keyExtractor={(index) => String(index)}
                            renderItem={({ item }) => (
                                <ProductCard
                                    product={item}
                                    getInFunction={() => navigationStack.navigate("productStatus", item)}
                                    profilePicture={false}
                                />
                            )}
                            style={{
                                marginTop: 10,

                            }}
                            contentContainerStyle={[
                                {
                                    paddingBottom: 80,
                                    justifyContent: "space-evenly"

                                },
                                productsArray.length === 0 && { flex: 1 },
                            ]}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() => (
                                <Center
                                    flex={1}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text color="gray.600" fontFamily="body"> Não há itens à venda por enquanto</Text>
                                </Center>
                            )}
                        />

                }
            </Box>
        </Box>
    )
}