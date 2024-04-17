import { VStack, Image, Text, IPressableProps, HStack, View, Flex, Box } from "native-base";
import { Pressable } from "react-native";
import { LittleButton } from "./LittleButton";
import { ProfilePicture } from "./ProfilePicture";

type Props = IPressableProps & {
    nome?: string;
    valor?: string;
    uri: string;
    userUri?: string;
    profilePicture?: boolean;
}

export function ProductCard({ nome, valor, uri, profilePicture = true, userUri, ...rest }: Props) {
    return (
        <Pressable
            {...rest}
        >
            <VStack
                height={24}
                maxHeight={24}
                flex={1}
            >
                <HStack
                    mt={1}
                    zIndex={1}
                >
                    {
                        profilePicture ?

                            <ProfilePicture
                                size={6}
                                uri={userUri}
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
                        backgroundColor="blue.200"
                        color="#FFFFFF"
                        title="novo"
                        fontSize="2xs"
                        height={4}
                        mt={1}
                        mr={1}
                    />
                </HStack>
                <Image
                    source={{ uri }}
                    alt="Product picture"
                    position="absolute"
                    resizeMode="stretch"
                    rounded={6}
                    width="100%"
                    height="100%"
                />
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