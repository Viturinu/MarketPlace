import { CarouselPicture } from "@components/CarouselPicture";
import { Header } from "@components/Header";
import { ProfilePicture } from "@components/ProfilePicture";
import { Box, HStack, View, Text, TextArea, VStack, ScrollView } from "native-base";
import { Dimensions, Linking } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { LittleButton } from "@components/LittleButton";
import { PaymentMethod } from "@components/PaymentMethod";
import { Button } from "@components/Button";
import { WhatsappLogo } from "phosphor-react-native";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { productsProps } from "@dtos/ProductDTO";
import { maskCurrency } from "@utils/masks";
import { useEffect } from "react";
import { AppRoutesNativeStackProps } from "@routes/app.routes.nativestack";
import { unmaskPhone } from "@utils/unmasks";

export function ProductDetails() {

    const { user } = useAuth();

    const screenWidth = Dimensions.get('window').width;
    const screenHeight38 = ((Dimensions.get('window').height) * 0.38);

    const route = useRoute();

    const product = route.params as productsProps;

    const navigation = useNavigation<AppRoutesNativeStackProps>();

    async function handleWhatsAppMessage() {

        const whatsappURL = `https://wa.me/55${unmaskPhone(product.user.tel)}`;

        try {
            const supported = await Linking.canOpenURL(whatsappURL); //verifica se é possivel abrir essa url
            if (supported) { //positivo, logo ...
                await Linking.openURL(whatsappURL); //abre url
            } else {
                console.log("Não é possível abrir o WhatsApp - " + whatsappURL);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box
            backgroundColor="gray.200"
            flex={1}
        >
            <Header backIconFunction={() => navigation.goBack()} backIcon />
            <Box mt={2}>
                <Carousel
                    width={screenWidth}
                    height={screenHeight38}
                    data={product.product_images}
                    loop={false}
                    renderItem={({ item }) => {
                        return <CarouselPicture
                            uri={`${api.defaults.baseURL}/images/${item.path}`}
                            active={product.is_active}
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
                        <ProfilePicture size={6} uri={`${api.defaults.baseURL}/images/${product.user.avatar}`} borderColor="blue.100" />
                        <Text
                            fontSize="sm"
                            fontFamily="heading"
                            color="gray.600"
                            ml={2}
                        >
                            {product.user.name}
                        </Text>
                    </HStack>
                    <Box
                        height={4}
                        width={12}
                        mt={5}
                    >
                        <LittleButton
                            fontSize="2xs"
                            type={product.is_new ? "darkBlue" : "darkGray"}
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
                            {product.name}
                        </Text>
                        <HStack
                            alignItems="center"
                        >
                            <Text color="blue.100" fontSize="sm" fontFamily="heading">R$</Text>
                            <Text color="blue.100" fontSize="lg" fontFamily="heading" ml={1}>{maskCurrency(product.price.toString())}</Text>
                        </HStack>
                    </HStack>

                    <Text fontSize="sm" color="gray.600" mt={2}>
                        {product.description}
                    </Text>

                    <HStack
                        mt={3}
                    >
                        <Text fontFamily="heading" color="gray.600" fontSize="sm">
                            Aceita trocas?
                        </Text>
                        <Text fontFamily="body" color="gray.600" fontSize="sm" ml={2}>
                            {product.accept_trade ? "Sim" : "Não"}
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
                            {
                                product.payment_methods.map((item) => (
                                    <PaymentMethod tipo={item.key} />
                                ))
                            }

                        </Box>
                    </VStack>
                </Box>
                <HStack
                    paddingX={4}
                    alignItems="center"
                    justifyContent="space-between"
                    height={20}
                    backgroundColor="gray.100"
                >
                    <HStack
                        alignItems="center"
                        flex={0.5}
                    >
                        <Text
                            fontSize="sm"
                            fontFamily="heading"
                            color="blue.100"
                        >
                            R$
                        </Text>
                        <Text
                            fontSize="lg"
                            fontFamily="heading"
                            color="blue.100"
                            ml={2}
                        >
                            {maskCurrency(product.price.toString())}
                        </Text>
                    </HStack>

                    <Button
                        title="Entrar em contato"
                        type="blue"
                        InternalIcon={WhatsappLogo}
                        weight="fill"
                        flex={0.5}
                        onPress={handleWhatsAppMessage}
                    />
                </HStack>
            </ScrollView>
        </Box >
    )
}