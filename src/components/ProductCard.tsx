import { VStack, Image, Text, IPressableProps, HStack, View, Flex, Box } from "native-base";
import { Pressable } from "react-native";
import Avatar from "@assets/avatar.png"
import { LittleButton } from "./LittleButton";

type Props = IPressableProps & {
    nome?: string;
    valor?: string;
    uri?: string;
}

export function ProductCard({ nome, valor, uri, ...rest }: Props) {
    return (
        <Pressable
            {...rest}
        >
            <VStack
                height="24"
                width="100%"
                alignItems="center"
            >
                <HStack
                    mt={1}
                    zIndex={1}
                    width="100%"
                >
                    <Image
                        source={Avatar}
                        alt="Imagem de profile"
                        size={6}
                        rounded={9999}
                        borderColor="gray.100"
                        borderWidth={1}
                        mt={1}
                        ml={1}
                    />
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
                    width="100%"
                    height="100%"
                />
            </VStack>

            <VStack>
                <Text
                    fontSize="md"
                    color="gray.600"
                    fontFamily="body"
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