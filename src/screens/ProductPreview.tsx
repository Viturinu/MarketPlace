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
import { photoFileProps, productUploadProps } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { unmaskCurrency } from "@utils/unmasks";
import { useState } from "react";
import { AppError } from "@utils/AppError";

type productUploadPropsToEdit = productUploadProps & {
    productId?: string;
    newImages?: photoFileProps[];
}

export function ProductPreview() {

    const { colors } = useTheme();

    const toast = useToast();

    const navigation = useNavigation<AppRoutesNativeStackProps>();

    const { user } = useAuth();

    const route = useRoute();

    const { productId, images = [], newImages, name, description, is_new, price, accept_trade, payment_methods } = route.params as productUploadPropsToEdit;

    const [isLoading, setIsLoading] = useState(false);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight38 = ((Dimensions.get('window').height) * 0.38);

    async function handlePublishProduct() {
        try {

            setIsLoading(true);

            console.log("ver qual o status do prodcutId: " + productId)

            const is_new_boolean = is_new === "new" ? true : false;//necessário, pois por default radio vem coms string nos values
            const accept_trade_defining = accept_trade === undefined ? false : accept_trade === false ? false : true;//necessário, pois por default value vem undefined

            const formResponse = productId ? await api.put(`/products/${productId}`, {
                name,
                description,
                is_new: is_new_boolean,
                price: Number(unmaskCurrency(price)),
                accept_trade: accept_trade_defining,
                payment_methods
            }) : await api.post("/products", {
                name,
                description,
                is_new: is_new_boolean,
                price: Number(unmaskCurrency(price)),
                accept_trade: accept_trade_defining,
                payment_methods
            })

            let productPhotoForm = new FormData(); //usado para pegar as fotos no click, trabalhar elas dentro do vetor, e depois sobrescrever com outra foto

            productPhotoForm.append("product_id", productId ? productId : formResponse.data.id); //se for criado o id com o post, ele usa ele; se já existir e tiver na opção de edição, utiliza do id passado via navigations

            //productPhotoForm.append("images", images as any);

            productId ? newImages.forEach((image) => {
                productPhotoForm.append('images', {
                    uri: image.uri,
                    name: image.name,
                    type: image.type
                } as any);
            })
                : images.forEach((image) => {
                    productPhotoForm.append('images', {
                        uri: image.uri,
                        name: image.name,
                        type: image.type
                    } as any);
                });

            await api.post("/products/images", productPhotoForm, {
                headers: {
                    "Content-Type": "multipart/form-data" //pra afirmar que não é mais um conteúdo JSON, e sim um multipart
                }
            })

            //apagar as imagens antigas
            if (productId) {

                const arrayPhotosId = images.map(item => item.id);

                await api.delete("/products/images", {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        productImagesIds: arrayPhotosId
                    }
                })
            }

            toast.show({
                title: productId ? "Seu produto foi atualizado com sucesso" : "Seu produto foi adicionado ao Market Place",
                placement: "top",
                bgColor: "green.700"
            })

            setTimeout(() => {
                navigation.navigate("BottomTabNavigator");
            }, 2000);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível realizar essa operação agora."

            toast.show({
                title,
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
                    data={newImages === undefined ? images : newImages}
                    loop={false}
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
                            type={is_new ? "darkBlue" : "darkGray"} />
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

                            {payment_methods.includes("card") && <PaymentMethod tipo="card" />}
                            {payment_methods.includes("deposit") && <PaymentMethod tipo="deposit" />}
                            {payment_methods.includes("cash") && <PaymentMethod tipo="cash" />}
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
                    isLoading={isLoading}
                    type="gray"
                    InternalIcon={ArrowLeft}
                    InternalIconColor="black"
                    flex={1}
                    onPress={() => navigation.goBack()}
                />

                <Button
                    title="Publicar"
                    isLoading={isLoading}
                    type="blue"
                    InternalIcon={Tag}
                    weight="regular"
                    ml={2}
                    flex={1}
                    onPress={handlePublishProduct}
                />
            </HStack>

        </Box >
    )
}