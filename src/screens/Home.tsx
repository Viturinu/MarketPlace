import { HStack, VStack, View, Text, Image } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@assets/avatar.png"
import { Button } from "@components/Button";
import { Plus, Tag, ArrowRight } from "phosphor-react-native";

export function Home() {
    return (
        <SafeAreaView>
            <VStack padding={4}>

                <HStack
                    style={{
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <HStack>
                        <Image
                            source={Avatar}
                            alt="Imagem de profile"
                        />
                        <View ml={2}>
                            <Text>
                                Boas vindas, {"\n"} <Text fontFamily="heading">Maria!</Text>
                            </Text>
                        </View>
                    </HStack>
                    <View w={6} h={4} />
                    <View
                        flex={1}
                        style={{
                            alignContent: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Button type="black" title="Criar anúncio" InternalIcon={Plus} />
                    </View>
                </HStack>

                <VStack
                    mt={4}
                >
                    <Text
                        fontSize="xs"
                        color="gray.600"
                    >
                        Seus produtos anunciados para venda
                    </Text>

                    <HStack
                        justifyContent="space-around"
                        alignItems="center"
                        backgroundColor="blue_light"
                        mt={4}
                        borderColor="gray.400"
                        borderWidth={1}
                    >
                        <HStack
                            alignItems="center"
                            justifyContent="space-around"
                            my={2}
                        >
                            <Tag size={20} color="blue_dark" />
                            <VStack ml={4}>
                                <Text
                                    fontFamily="heading"
                                    fontSize="lg"
                                >
                                    4
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
                                color="blue_dark"
                                mr={2}
                            >
                                Meus anúncios
                            </Text>
                            <ArrowRight
                                size={16}
                                color="blue_dark"

                            />
                        </HStack>
                    </HStack>
                </VStack>
            </VStack>
        </SafeAreaView>
    )
}