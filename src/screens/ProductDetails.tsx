import { CarouselPicture } from "@components/CarouselPicture";
import { Header } from "@components/Header";
import { ProfilePicture } from "@components/ProfilePicture";
import { Box, HStack, View, Text, TextArea, VStack, ScrollView } from "native-base";
import { Dimensions } from "react-native";
import Avatar from "@assets/avatar.png"
import Carousel from 'react-native-reanimated-carousel';
import { LittleButton } from "@components/LittleButton";
import { PaymentMethod } from "@components/PaymentMethod";
import { Button } from "@components/Button";
import { WhatsappLogo } from "phosphor-react-native";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

export function ProductDetails() {

    const { user } = useAuth();

    const screenWidth = Dimensions.get('window').width;
    const screenHeight38 = ((Dimensions.get('window').height) * 0.38);

    const images = [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree",
    ];

    return (
        <Box
            backgroundColor="gray.200"
            flex={1}
        >
            <Header backIcon />
            <Box mt={2}>
                <Carousel
                    width={screenWidth}
                    height={screenHeight38}
                    data={images}
                    renderItem={({ item }) => {
                        return <CarouselPicture
                            uri={item}
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
                            Makenna Baptista
                        </Text>
                    </HStack>
                    <Box
                        height={4}
                        width={12}
                        mt={5}
                    >
                        <LittleButton
                            fontSize="2xs"
                            color="gray.600"
                            title="novo"
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
                            Bicicleta
                        </Text>
                        <HStack
                            alignItems="center"
                        >
                            <Text color="blue.100" fontSize="sm" fontFamily="heading">R$</Text>
                            <Text color="blue.100" fontSize="lg" fontFamily="heading" ml={1}>120,00</Text>
                        </HStack>
                    </HStack>

                    <Text fontSize="sm" color="gray.600" mt={2}>
                        Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
                    </Text>

                    <HStack
                        mt={3}
                    >
                        <Text fontFamily="heading" color="gray.600" fontSize="sm">
                            Aceita trocas?
                        </Text>
                        <Text fontFamily="body" color="gray.600" fontSize="sm" ml={2}>
                            Sim
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
                            <PaymentMethod tipo="boleto" />
                            <PaymentMethod tipo="credito" />
                            <PaymentMethod tipo="deposito" />
                            <PaymentMethod tipo="dinheiro" />
                            <PaymentMethod tipo="pix" />
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
                            120,00
                        </Text>
                    </HStack>

                    <Button
                        title="Entrar em contato"
                        type="blue"
                        InternalIcon={WhatsappLogo}
                        weight="fill"
                        flex={0.5}
                    />
                </HStack>
            </ScrollView>
        </Box >
    )
}