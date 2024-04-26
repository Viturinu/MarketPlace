import { VStack, Image, Text, HStack, View, Box } from "native-base";
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { LittleButton } from "./LittleButton";
import { ProfilePicture } from "./ProfilePicture";
import { api } from "@services/api";
import { productsProps } from "@dtos/ProductDTO";
import { maskCurrency } from "@utils/masks";

type Props = TouchableOpacityProps & {
    product: productsProps;
    profilePicture?: boolean;
    getInFunction: () => void;
}

export function ProductCard({ profilePicture = true, getInFunction, product, ...rest }: Props) {
    /*
    if (Object.keys(product).length === 0) {
        console.log("DEU INDEFINIUDO< CARAMBA");
        return (
            <VStack
                height={24}
                backgroundColor="amber.500"
            >
                <VStack
                    justifyContent="space-between"
                    zIndex={2}
                >
                    <Box
                        size={6}
                        mt={1}
                        ml={1}
                    />
                    <Box
                        width="40%"
                    />
                    <LittleButton
                        type={product.is_new ? "darkBlue" : "darkGray"}
                        fontSize="2xs"
                        height={4}
                        mt={1}
                        mr={1}
                    />
                </VStack>
            </VStack>
        )
    }
    */
    return (
        <TouchableOpacity
            onPress={getInFunction}
            {...rest}
        >
            <View
                width={34}
                maxWidth={34}
                ml={2}
            >
                <VStack>
                    <VStack
                        justifyContent="space-between"
                        height={24}
                        zIndex={2}
                    >

                        <HStack
                            mt={1}
                        >
                            {
                                profilePicture ?

                                    <ProfilePicture
                                        size={6}
                                        uri={`${api.defaults.baseURL}/images/${product.user.avatar}`}
                                        borderColor="gray.100"
                                        mt={1}
                                        ml={1}
                                    />
                                    : <Box
                                        size={6}
                                        mt={1}
                                        ml={1}
                                    />
                            }

                            <Box
                                width="40%"
                            />
                            <LittleButton
                                type={product.is_new ? "darkBlue" : "darkGray"}
                                fontSize="2xs"
                                height={4}
                                mt={1}
                                mr={1}
                            />
                        </HStack>
                        {
                            !product.is_active && <Text
                                fontFamily="heading"
                                fontSize="2xs"
                                color="gray.100"
                                ml={1}
                                mb={2}
                            >
                                ANÚNCIO DESATIVADO
                            </Text>
                        }

                    </VStack>
                    <View
                        height="100%"
                        width="100%"
                        position="absolute"
                    >
                        {
                            !product.is_active && <View
                                height="100%"
                                width="100%"
                                bgColor={"rgba(0, 0, 0, 0.5)"}
                                zIndex={1}
                                rounded={6}
                            />
                        }

                        <Image
                            source={{ uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}` }}
                            alt="Product picture"
                            resizeMode="stretch"
                            position="absolute"
                            rounded={6}
                            width="100%"
                            height="100%"
                        />
                    </View>
                </VStack>

                <VStack>
                    <Text
                        fontSize="md"
                        color="gray.600"
                        fontFamily="body"
                        numberOfLines={1}
                    >
                        {product.name}
                    </Text>
                    <HStack
                        alignItems="center"
                    >
                        <Text
                            fontFamily="heading"
                            fontSize="sm"
                            numberOfLines={1}

                        >
                            R$
                        </Text>
                        <Text
                            lineHeight="lg"
                            fontFamily="heading"
                            fontSize="lg"
                        >
                            {maskCurrency(String(product.price))}
                        </Text>
                    </HStack>
                </VStack>
            </View>
        </TouchableOpacity>
    )

}