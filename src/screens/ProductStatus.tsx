import { CarouselPicture } from "@components/CarouselPicture";
import { Header } from "@components/Header";
import { ProfilePicture } from "@components/ProfilePicture";
import { Box, HStack, View, Text, VStack, ScrollView } from "native-base";
import { Dimensions } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { LittleButton } from "@components/LittleButton";
import { PaymentMethod } from "@components/PaymentMethod";
import { Button } from "@components/Button";
import { Power, Trash } from "phosphor-react-native";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { productsProps } from "@dtos/ProductDTO";
import { AppRoutesNativeStackProps } from "@routes/app.routes.nativestack";
import { err } from "react-native-svg";
import { useState } from "react";

export function ProductStatus() {

    const route = useRoute();

    const navigation = useNavigation<AppRoutesNativeStackProps>();

    const product = route.params as productsProps;

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuth();

    const screenWidth = Dimensions.get('window').width;
    const screenHeight40 = ((Dimensions.get('window').height) * 0.35);

    function handleActivateProduct() {
        try {
            setIsLoading(true);
            api.patch(`/products/${product.id}`, {
                "is_active": !product.is_active
            })
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    function handleRemoveProduct() {
        try {
            setIsLoading(true);
            api.delete(`/products/${product.id}`)
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box
            backgroundColor="gray.200"
            flex={1}
        >
            <Header backIcon backIconFunction={() => navigation.goBack()} />
            <Box mt={2}>
                <Carousel
                    width={screenWidth}
                    height={screenHeight40}
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
                    mb={5}
                    paddingX={4}
                >
                    <HStack>
                        <ProfilePicture
                            size={6}
                            uri={`${api.defaults.baseURL}/images/${user.avatar}`}
                            borderColor="blue.100"
                        />

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
                            <Text color="blue.100" fontSize="lg" fontFamily="heading" ml={1}>120,00</Text>
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
                                product.payment_methods.map(item => {
                                    return item
                                })

                                product.payment_methods.forEach(item => {
                                item.key === "boleto" && <PaymentMethod tipo="boleto" />
                                    item.key === "boleto" && <PaymentMethod tipo="boleto" />
                            item.key === "deposit" && <PaymentMethod tipo="deposit" />
                            item.key === "cash" && <PaymentMethod tipo="cash" />
                            item.key === "pix" && <PaymentMethod tipo="pix" />
                                })
                            }
                        </Box>
                    </VStack>

                    <View
                        mt={8}
                    >

                        <Button
                            title={product.is_active ? "Desativar anúncio" : "Reativar anúncio"}
                            type={product.is_active ? "black" : "blue"}
                            InternalIcon={Power}
                            weight="regular"
                            onPress={handleActivateProduct}
                            isLoading={isLoading}
                        />
                        <Button
                            title="Excluir anúncio"
                            type="gray"
                            InternalIcon={Trash}
                            mt={2}
                            weight="regular"
                            InternalIconColor="#5F5B62"
                            onPress={handleRemoveProduct}
                            isLoading={isLoading}
                        />
                    </View>
                </Box>
            </ScrollView>
        </Box >
    )
}