import { HStack, VStack, View, Text, useTheme, FlatList, Box, Center, Modal, Switch, Checkbox } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@components/Button";
import { Plus, Tag, ArrowRight } from "phosphor-react-native";
import { Input } from "@components/Input";
import { ProductCard } from "@components/ProductCard";
import { ProfilePicture } from "@components/ProfilePicture";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppRoutesNativeStackProps } from "@routes/app.routes.nativestack";
import { AppRoutesBottomTabProps } from "@routes/app.routes.bottomtab";
import { useAuth } from "@hooks/useAuth";
import { useCallback, useState } from "react";
import { api } from "@services/api";
import { productsProps } from "@dtos/ProductDTO";
import { maskCurrency } from "@utils/masks";
import { ModalFilter } from "@components/ModalFilter";

export function Home() {

    const navigationStack = useNavigation<AppRoutesNativeStackProps>();
    const navigationBottomTab = useNavigation<AppRoutesBottomTabProps>();

    const [productsArray, setProductsArray] = useState<productsProps[]>([] as productsProps[]);
    const [myProductsArray, setMyProductsArray] = useState<productsProps[]>([] as productsProps[]);

    const [query, setQuery] = useState("");

    const [isNew, setIsNew] = useState<boolean>(true); //Este é o estado que guarda de fato o estado, os outros relacionados são helpers
    const [acceptTrade, setAcceptTrade] = useState<boolean>(false);
    const [paymentMethods, setPaymentMethods] = useState<string[]>(["boleto", "pix", "cash", "card", "deposit"]);

    const [showModal, setShowModal] = useState(false);

    const { user } = useAuth();

    const { colors } = useTheme();

    async function loadUserImageAndAnnounces() {
        try {
            // Faça sua chamada à API para obter a imagem
            const arrayProducts = await api.get("/products");
            setProductsArray(arrayProducts.data);

            const myProductsArray = await api.get("/users/products"); //para contador na Home
            setMyProductsArray(myProductsArray.data);
            //console.log(`${api.defaults.baseURL}/images/${user.avatar}`)
            //console.log(userImage)
            //setUserImage(imageResponse.data);

        } catch (error) {
            // Se ocorrer um erro ao fazer a chamada à API, trate o erro
            console.log('Erro ao fazer a chamada à API');
        }
    }

    async function handleSearch() {
        try {
            const response = await api.get("/products", {
                params: {
                    is_new: isNew,
                    accept_trade: acceptTrade,
                    payment_methods: paymentMethods, // Aqui não é necessário fazer join(','), pois o Axios irá lidar com isso automaticamente
                    query: query
                }
            })

            setProductsArray(response.data);
        } catch (error) {

        } finally {
            setShowModal(false);
        }
    }

    function handleResetValues() {
        setIsNew(true);
        setAcceptTrade(true);
        setPaymentMethods(["boleto", "pix", "cash", "card", "deposit"])
    }

    function handleGetInFunction(item: productsProps) {
        navigationStack.navigate("productDetails", item)
    }

    useFocusEffect(useCallback(() => {
        loadUserImageAndAnnounces();
    }, []))

    return (
        <VStack
            padding={4}
            bgColor="gray.200"
            flex={1}
        >
            <SafeAreaView
                style={{
                    flex: 1
                }}
            >
                <ModalFilter showModal={showModal} setShowModal={setShowModal} acceptTrade={acceptTrade} setAcceptTrade={setAcceptTrade} isNew={isNew} setIsNew={setIsNew} paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods} handleFilterApply={handleSearch} handleResetValues={handleResetValues} />

                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                >

                    <HStack
                        flex={0.5}
                    >
                        <ProfilePicture
                            size={11}
                            uri={`${api.defaults.baseURL}/images/${user.avatar}`}
                            borderColor="blue.100"
                        />
                        <VStack ml={2}>
                            <Text>
                                Boas vindas,
                            </Text>
                            <Text fontFamily="heading">
                                {user.name}!
                            </Text>
                        </VStack>
                    </HStack>

                    <Button
                        type="black"
                        title="Criar anúncio"
                        InternalIcon={Plus}
                        flex={0.4}
                        onPress={() => navigationStack.navigate("newProduct")}
                    />
                </HStack>

                <Box
                    mt={4}
                    flex={1}
                >
                    <Text
                        fontSize="xs"
                        color="gray.600"
                    >
                        Seus produtos anunciados para venda
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigationBottomTab.navigate("myproducts")}
                    >
                        <HStack
                            justifyContent="space-around"
                            alignItems="center"
                            backgroundColor="rgba(100,122,199, 0.1)"
                            mt={4}
                            px={2}
                        >

                            <HStack
                                alignItems="center"
                                justifyContent="space-around"
                                my={2}
                            >
                                <Tag size={20} color={colors.blue[200]} />
                                <VStack ml={4}>
                                    <Text
                                        fontFamily="heading"
                                        fontSize="lg"
                                    >
                                        {myProductsArray.length}
                                    </Text>
                                    <Text fontFamily="body" fontSize="xs">
                                        anúncios ativos
                                    </Text>
                                </VStack>
                            </HStack>
                            <HStack
                                alignItems="center"
                            >
                                <Text
                                    fontSize="xs"
                                    fontFamily="heading"
                                    color="blue.200"
                                    mr={2}
                                >
                                    Meus anúncios
                                </Text>
                                <ArrowRight
                                    size={16}
                                    color={colors.blue[200]}

                                />
                            </HStack>

                        </HStack>
                    </TouchableOpacity>
                    <View
                        mt={10}
                    >
                        <VStack>
                            <Text
                                fontSize="xs"
                                color="gray.600"
                            >
                                Compre produtos variados
                            </Text>
                            <Input placeHolder="Buscar anúncio" search showModal={() => setShowModal(true)} handleSearch={handleSearch} onChangeText={setQuery} value={query} onSubmitEditing={handleSearch} />
                        </VStack>
                    </View>

                    <FlatList
                        data={productsArray}
                        numColumns={2}
                        keyExtractor={item => item.name + item.price}
                        renderItem={({ item }) => (
                            <ProductCard
                                product={item}
                                getInFunction={() => handleGetInFunction(item)}
                            />
                        )}
                        style={{
                            marginTop: 10,
                        }}
                        contentContainerStyle={[
                            {
                                paddingBottom: 30,
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

                </Box>

            </SafeAreaView>
        </VStack>
    )
}