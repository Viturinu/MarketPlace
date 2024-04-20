import { VStack, Image, Text, IPressableProps, HStack, View, Flex, Box } from "native-base";
import { Pressable } from "react-native";
import { LittleButton } from "./LittleButton";
import { ProfilePicture } from "./ProfilePicture";
import { api } from "@services/api";

type Props = IPressableProps & {
    nome?: string;
    valor?: string;
    uri: string;
    userUri?: string;
    status?: "novo" | "usado";
    isActive?: boolean;
    profilePicture?: boolean;
}

export function ProductCard({ nome, valor, uri, profilePicture = true, status = "novo", userUri, isActive = true, ...rest }: Props) {
    return (
        <Pressable
            {...rest}
        >
            <VStack
                height={24}
                maxHeight={24}
                flex={1}
            >
                <VStack
                    justifyContent="space-between"
                    flex={1}
                    zIndex={2}
                >

                    <HStack
                        mt={1}
                    >
                        {
                            profilePicture ?

                                <ProfilePicture
                                    size={6}
                                    uri={`${api.defaults.baseURL}/images/${userUri}`}
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
                            type={status === "novo" ? "darkBlue" : "darkGray"}
                            title={status}
                            fontSize="2xs"
                            height={4}
                            mt={1}
                            mr={1}
                        />
                    </HStack>
                    {
                        !isActive && <Text
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
                        !isActive && <View
                            height="100%"
                            width="100%"
                            bgColor={"rgba(0, 0, 0, 0.5)"}
                            zIndex={1}
                            rounded={6}
                        />
                    }

                    <Image
                        source={{ uri: `${api.defaults.baseURL}/images/${uri}` }}
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
                    {nome}
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
                        {valor}
                    </Text>
                </HStack>
            </VStack>
        </Pressable>
    )
}