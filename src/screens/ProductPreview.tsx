import { CarouselPicture } from "@components/CarouselPicture";
import { ProfilePicture } from "@components/ProfilePicture";
import { Box, HStack, View, Text, TextArea, VStack, ScrollView, Center, useTheme, useToast } from "native-base";
import { Dimensions } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { LittleButton } from "@components/LittleButton";
import { PaymentMethod } from "@components/PaymentMethod";
import { Button } from "@components/Button";
import { ArrowLeft, Tag } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AppRoutesNativeStackProps } from "@routes/app.routes.nativestack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { productUploadProps } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { unmaskCurrency } from "@utils/unmasks";

export function ProductPreview() {

    const { colors } = useTheme();

    const toast = useToast();

    const navigation = useNavigation<AppRoutesNativeStackProps>();

    const { user } = useAuth();

    const route = useRoute();

    const { images = [], name, description, is_new, price, accept_trade, payment_methods } = route.params as productUploadProps;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight38 = ((Dimensions.get('window').height) * 0.38);

    async function handleNextStep() {
        try {

            const is_new_boolean = is_new === "new" ? true : false;//necessário, pois por default radio vem coms string nos values
            const accept_trade_defining = accept_trade === undefined ? false : true;//necessário, pois por default value vem undefined

            const formResponse = await api.post("/products", {
                name,
                description,
                is_new: is_new_boolean,
                price: Number(unmaskCurrency(price)),
                accept_trade: accept_trade_defining,
                payment_methods
            })

            let productPhotoForm = new FormData(); //usado para pegar as fotos no click, trabalhar elas dentro do vetor, e depois sobrescrever com outra foto

            productPhotoForm.append("product_id", formResponse.data.id); //recuperei o id no post de cima
            productPhotoForm.append("images", images as any); //uploading imagens primeiro

            await api.post("/products/images", productPhotoForm, {
                headers: {
                    "Content-Type": "multipart/form-data" //pra afirmar que não é mais um conteúdo JSON, e sim um multipart
                }
            });

            toast.show({
                title: "Seu produto foi adicionado ao Market Place",
                placement: "top",
                bgColor: "green.700"
            })
        } catch (error) {
            return toast.show({
                title: error.message,
                placement: "top",
                bgColor: "red.700"
            })
        }
    }

    return (
        <Box
            backgroundColor="gray.200"
            flex={1}
        >
            <StatusBar
                style='dark'
                backgroundColor={colors.blue[100]}
                translucent
            />
            <SafeAreaView>
                <Center
                    height={16}
                    alignItems="center"
                    backgroundColor="blue.100"
                >
                    <Text
                        fontFamily="heading"
                        color="gray.100"
                        fontSize="sm"
                    >
                        Pré visualização do anúncio
                    </Text>
                    <Text
                        fontFamily="body"
                        color="gray.100"
                        fontSize="xs"
                    >
                        É assim que seu produto vai aparecer
                    </Text>
                </Center>
            </SafeAreaView>
            <Box>
                <Carousel
                    width={screenWidth}
                    height={screenHeight38}
                    data={images}
                    renderItem={({ item }) => {
                        return <CarouselPicture
                            uri={item.uri}
                            active={true}
                        />
                    }}
                />;
            </Box>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Box
                    paddingX={4}
                    mb={5}
                >
                    <HStack>
                        <ProfilePicture size={6} uri={`${api.defaults.baseURL}/images/${user.avatar}`} borderColor="blue.100" />
                        <Text
                            fontSize="sm"
                            fontFamily="heading"
                            color="gray.600"
                            ml={2}
                        >
                            {user.name}
                        </Text>
                    </HStack>

                    <Box
                        height={4}
                        width={12}
                        mt={5}
                    >
                        <LittleButton
                            fontSize="2xs"
                            background="gray.600"
                            color={is_new === "new" ? "blue.100" : "gray.600"}
                            title={is_new === "new" ? "novo" : "usado"}
                            backgroundColor="gray.300"
                        />
                    </Box>
                    <HStack
                        justifyContent="space-between"
                        mt={1}
                    >
                        <Text
                            fontSize="lg"
                            fontFamily="heading"
                            color="gray.700"
                        >
                            {name}
                        </Text>
                        <HStack
                            alignItems="center"
                        >
                            <Text color="blue.100" fontSize="sm" fontFamily="heading">R$</Text>
                            <Text color="blue.100" fontSize="lg" fontFamily="heading" ml={1}>{price}</Text>
                        </HStack>
                    </HStack>

                    <Text fontSize="sm" color="gray.600" mt={2}>
                        {description}
                    </Text>

                    <HStack
                        mt={3}
                    >
                        <Text fontFamily="heading" color="gray.600" fontSize="sm">
                            Aceita trocas?
                        </Text>
                        <Text fontFamily="body" color="gray.600" fontSize="sm" ml={2}>
                            {accept_trade ? "Sim" : "Não"}
                        </Text>
                    </HStack>

                    <VStack
                        mt={3}
                    >
                        <Text fontFamily="heading" color="gray.600" fontSize="sm">
                            Meio de pagamento:
                        </Text>
                        <Box
                            mt={1}
                        >
                            {payment_methods.includes("boleto") && <PaymentMethod tipo="boleto" />}

                            {payment_methods.includes("card") && <PaymentMethod tipo="credito" />}
                            {payment_methods.includes("deposit") && <PaymentMethod tipo="deposito" />}
                            {payment_methods.includes("cash") && <PaymentMethod tipo="dinheiro" />}
                            {payment_methods.includes("pix") && <PaymentMethod tipo="pix" />}
                        </Box>
                    </VStack>
                </Box>

            </ScrollView>

            <HStack
                paddingX={4}
                alignItems="center"
                justifyContent="space-between"
                height={20}
                backgroundColor="gray.100"
            >
                <Button
                    title="Voltar e editar"
                    type="gray"
                    InternalIcon={ArrowLeft}
                    InternalIconColor="black"
                    flex={0.5}
                    onPress={() => navigation.goBack()}
                />

                <Button
                    title="Publicar"
                    type="blue"
                    InternalIcon={Tag}
                    weight="regular"
                    flex={0.5}
                    onPress={handleNextStep}
                />
            </HStack>

        </Box >
    )
}