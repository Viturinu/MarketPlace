import { HStack, VStack, View, Text, useTheme, FlatList, Box, Center, Image, Modal, Switch, Checkbox } from "native-base";
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
import { LittleButton } from "@components/LittleButton";
import { LittleButtonSelect } from "@components/LittleButtonSelect";


export function Home() {

    const navigationStack = useNavigation<AppRoutesNativeStackProps>();
    const navigationBottomTab = useNavigation<AppRoutesBottomTabProps>();

    const [productsArray, setProductsArray] = useState<productsProps[]>([] as productsProps[]);
    const [myProductsArray, setMyProductsArray] = useState<productsProps[]>([] as productsProps[]);

    const [showModal, setShowModal] = useState(false);

    const [isNew, setIsNew] = useState<boolean>(true);
    const [acceptTrade, setAcceptTrade] = useState<boolean>(false);
    const [paymentMethods, setPaymentMethods] = useState<string[]>(["boleto", "deposit", "cash", "card", "pix"]);

    const { user } = useAuth();

    const { colors } = useTheme();

    async function loadUserImageAndAnnounces() {
        try {
            // Faça sua chamada à API para obter a imagem
            const arrayProducts = await api.get("/products");
            setProductsArray(arrayProducts.data);

            const productsArrayWithOwnerPicture = productsArray.map(item => {

            })

            const myProductsArray = await api.get("/users/products");
            setMyProductsArray(myProductsArray.data);
            //console.log(`${api.defaults.baseURL}/images/${user.avatar}`)
            //console.log(userImage)
            //setUserImage(imageResponse.data);

        } catch (error) {
            // Se ocorrer um erro ao fazer a chamada à API, trate o erro
            console.log('Erro ao fazer a chamada à API');
        }
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

                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                >
                    <Modal.Content
                        width="full"
                        height="full"
                        roundedTop={15}
                        backgroundColor="gray.200"
                        marginBottom={0}
                        marginTop="auto"
                    >
                        <Modal.Body
                            padding={6}
                        >
                            <Text
                                fontFamily="heading"
                                fontSize="lg"
                                mt={4}
                            >
                                Filtrar anúncios
                            </Text>
                            <VStack>
                                <Text
                                    fontFamily="heading"
                                    color="gray.600"
                                    fontSize="sm"
                                    mt={4}
                                >
                                    Condição
                                </Text>

                                <HStack
                                    w="50%"
                                    h={6}
                                    mt={2}
                                >
                                    <TouchableOpacity
                                        onPress={() => setIsNew(true)}
                                    >
                                        <LittleButtonSelect
                                            type="modalBlue"
                                            isSelected={isNew}
                                            fontSize="xs"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setIsNew(false)}
                                    >
                                        <LittleButtonSelect
                                            type="modalGray"
                                            isSelected={!isNew}
                                            ml={2}
                                            fontSize="xs"
                                        />
                                    </TouchableOpacity>
                                </HStack>
                            </VStack>

                            <VStack
                                mt={2}
                            >
                                <Text
                                    fontFamily="heading"
                                    color="gray.600"
                                    fontSize="sm"
                                    mt={4}
                                >
                                    Aceita trocas?
                                </Text>

                                <HStack
                                    w="50%"
                                    h={6}
                                    mt={2}
                                >
                                    <Switch value={acceptTrade} size="lg" />
                                </HStack>
                            </VStack>

                            <VStack
                                mt={2}
                            >
                                <Text
                                    fontFamily="heading"
                                    color="gray.600"
                                    fontSize="sm"
                                    mt={4}
                                >
                                    Meios de pagamento aceitos
                                </Text>

                                <VStack
                                    mt={2}
                                >
                                    <Checkbox.Group
                                        onChange={() => setPaymentMethods}
                                        value={paymentMethods}
                                        accessibilityLabel="choose payment methods">
                                        <Checkbox value="boleto" colorScheme="blue" defaultIsChecked>
                                            Boleto
                                        </Checkbox>
                                        <Checkbox value="pix" colorScheme="blue" defaultIsChecked>
                                            Pix
                                        </Checkbox>
                                        <Checkbox value="cash" colorScheme="blue" defaultIsChecked>
                                            Dinheiro
                                        </Checkbox>
                                        <Checkbox value="card" colorScheme="blue" defaultIsChecked>
                                            Cartão de crédito
                                        </Checkbox>
                                        <Checkbox value="deposit" colorScheme="blue" defaultIsChecked>
                                            Depósito Bancário
                                        </Checkbox>
                                    </Checkbox.Group>
                                </VStack>
                            </VStack>

                            <HStack
                                mt={6}
                            >
                                <Button
                                    flex={1}
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                    title="Resetar filtros"
                                    type="gray"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    flex={1}
                                    ml={2}
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                    title="Aplicar filtros"
                                    type="black"
                                >
                                    Save
                                </Button>
                            </HStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal><Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                >
                    <Modal.Content
                        width="full"
                        height="full"
                        roundedTop={15}
                        backgroundColor="gray.200"
                        marginBottom={0}
                        marginTop="auto"
                    >
                        <Modal.Body
                            padding={6}
                        >
                            <Text
                                fontFamily="heading"
                                fontSize="lg"
                                mt={4}
                            >
                                Filtrar anúncios
                            </Text>
                            <VStack>
                                <Text
                                    fontFamily="heading"
                                    color="gray.600"
                                    fontSize="sm"
                                    mt={4}
                                >
                                    Condição
                                </Text>

                                <HStack
                                    w="50%"
                                    h={6}
                                    mt={2}
                                >
                                    <LittleButton
                                        type="darkBlue"
                                        fontSize="xs"
                                    />
                                    <LittleButton
                                        type="darkGray"
                                        ml={2}
                                        fontSize="xs"
                                    />
                                </HStack>
                            </VStack>

                            <VStack
                                mt={2}
                            >
                                <Text
                                    fontFamily="heading"
                                    color="gray.600"
                                    fontSize="sm"
                                    mt={4}
                                >
                                    Aceita trocas?
                                </Text>

                                <HStack
                                    w="50%"
                                    h={6}
                                    mt={2}
                                >
                                    <Switch size="lg" />
                                </HStack>
                            </VStack>

                            <VStack
                                mt={2}
                            >
                                <Text
                                    fontFamily="heading"
                                    color="gray.600"
                                    fontSize="sm"
                                    mt={4}
                                >
                                    Meios de pagamento aceitos
                                </Text>

                                <VStack
                                    mt={2}
                                >
                                    <Checkbox value="Boleto" colorScheme="purple" defaultIsChecked>
                                        Boleto
                                    </Checkbox>
                                    <Checkbox value="Pix" colorScheme="purple" defaultIsChecked>
                                        Pix
                                    </Checkbox>
                                    <Checkbox value="Dinheiro" colorScheme="purple" defaultIsChecked>
                                        Dinheiro
                                    </Checkbox>
                                    <Checkbox value="Credito" colorScheme="purple" defaultIsChecked>
                                        Cartão de crédito
                                    </Checkbox>
                                    <Checkbox value="Deposito" colorScheme="purple" defaultIsChecked>
                                        Depósito Bancário
                                    </Checkbox>
                                </VStack>
                            </VStack>

                            <HStack
                                mt={6}
                            >
                                <Button
                                    flex={1}
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                    title="Resetar filtros"
                                    type="gray"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    flex={1}
                                    ml={2}
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                    title="Aplicar filtros"
                                    type="black"
                                >
                                    Save
                                </Button>
                            </HStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

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
                            <Input placeHolder="Buscar anúncio" search showModal={() => setShowModal(true)} />
                        </VStack>
                    </View>

                    <FlatList
                        data={productsArray}
                        numColumns={2}
                        keyExtractor={item => item.name + item.price}
                        renderItem={({ item }) => (
                            <ProductCard
                                nome={item.name}
                                valor={maskCurrency(String(item.price))}
                                uri={item.product_images[0].path}
                                userUri={item.user.avatar}
                                flex={0.5}
                                marginTop={12}
                                margin={6}
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