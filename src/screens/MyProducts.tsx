import { Header } from "@components/Header";
import { ProductCard } from "@components/ProductCard";
import { Box, Text, HStack, Select, CheckIcon, FlatList, Center, Image } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppRoutesNativeStackProps } from "@routes/app.routes.nativestack";
import { api } from "@services/api";
import { productsProps } from "@dtos/ProductDTO";

export function MyProducts() {

    const navigationStack = useNavigation<AppRoutesNativeStackProps>();

    const [service, setService] = useState("Todos");

    const [isLoading, setIsLoading] = useState(true);

    const [productsArray, setProductArray] = useState<productsProps[]>([] as productsProps[]);

    const navigation = useNavigation<AppRoutesNativeStackProps>();

    function handleGetInFunction(item: productsProps) {
        navigationStack.navigate("productDetails", item)
    }

    async function updateMyProducts() {
        try {
            setIsLoading(true);
            const response = await api.get("/users/products");
            console.log(response.data)
            setProductArray([...response.data, {} as productsProps]);

        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    function getInMyProduct() {
        console.log("Entrei no meu produto" + productsArray.length);
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
                    <Select selectedValue={service} width={110} height={8} accessibilityLabel="Todos" placeholderTextColor="gray.600" placeholder="Todos" _selectedItem={{
                        bg: "gray.200",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item label="Cross Platform Development" value="cross" />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item label="Backend Development" value="backend" />
                    </Select>
                </Box>
            </HStack>
            {
                !isLoading && <FlatList
                    data={productsArray}
                    numColumns={2}
                    keyExtractor={(item, index) => item.name + index}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            getInFunction={() => getInMyProduct()}
                            profilePicture={false}
                        />
                    )}
                    style={{
                        marginTop: 10,
                    }}
                    contentContainerStyle={[
                        {
                            paddingBottom: 80,

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
    )
}