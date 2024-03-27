import { HStack, VStack, View, Text, Image, useTheme, Modal, FlatList, Flex, Pressable, Box } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@assets/avatar.png"
import { Button } from "@components/Button";
import { Plus, Tag, ArrowRight } from "phosphor-react-native";
import { Input } from "@components/Input";
import { ProductCard } from "@components/ProductCard";
import sha256 from 'crypto-js/sha256';
import { useRef, useState } from "react";

export function Home() {

    const pressableref = useRef();

    const productList = [
        {
            nome: "Tênis azul",
            valor: "59,90",
            uri: "https://cdn.awsli.com.br/2500x2500/209/209769/produto/44794689/9121372ae1.jpg"
        },
        {
            nome: "Tênis vermelho",
            valor: "59,90",
            uri: "https://cdn.awsli.com.br/2500x2500/209/209769/produto/44794689/9121372ae1.jpg"
        },
        {
            nome: "Tênis amarelo",
            valor: "59,90",
            uri: "https://cdn.awsli.com.br/2500x2500/209/209769/produto/44794689/9121372ae1.jpg"
        },
        {
            nome: "Tênis rosa",
            valor: "59,90",
            uri: "https://cdn.awsli.com.br/2500x2500/209/209769/produto/44794689/9121372ae1.jpg"
        },
        {
            nome: "Tênis vinho",
            valor: "59,90",
            uri: "https://cdn.awsli.com.br/2500x2500/209/209769/produto/44794689/9121372ae1.jpg"
        },
        {
            nome: "Tênis preto",
            valor: "59,90",
            uri: "https://cdn.awsli.com.br/2500x2500/209/209769/produto/44794689/9121372ae1.jpg"
        },
        {
            nome: "Tênis azul marinho",
            valor: "59,90",
            uri: "https://cdn.awsli.com.br/2500x2500/209/209769/produto/44794689/9121372ae1.jpg"
        },
        {
            nome: "Tênis verde água",
            valor: "59,90",
            uri: "https://cdn.awsli.com.br/2500x2500/209/209769/produto/44794689/9121372ae1.jpg"
        },
        {
            nome: "Tênis azul pscina",
            valor: "59,90",
            uri: "https://cdn.awsli.com.br/2500x2500/209/209769/produto/44794689/9121372ae1.jpg"
        },
    ]

    const { colors } = useTheme();

    return (
        <View
            flex={1}
        >
            <VStack
                padding={4}
                bgColor="gray.200"
            >
                <SafeAreaView>
                    <HStack
                        alignItems="center"
                        justifyContent="space-between"

                    >
                        <HStack>
                            <Image
                                source={Avatar}
                                alt="Imagem de profile"
                                size={11}
                                rounded={9999}
                                borderWidth={1}
                                borderColor="blue.100"
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
                            <Button
                                type="black"
                                title="Criar anúncio"
                                InternalIcon={Plus}
                            />
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
                            backgroundColor="rgba(100,122,199, 0.1)"
                            mt={4}
                            px={2}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-around"
                                my={2}
                            >
                                <Tag size={20} color={colors.blue[200]} />
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

                            <Pressable
                                _pressed={{
                                    backgroundColor: "gray.300"
                                }}
                            >
                                <HStack
                                    alignItems="center"
                                >
                                    <Text
                                        fontSize="xs"
                                        fontFamily="heading"
                                        color="blue.200"
                                        mr={2}
                                    >
                                        Meus anúncios
                                    </Text>
                                    <ArrowRight
                                        size={16}
                                        color={colors.blue[200]}

                                    />
                                </HStack>
                            </Pressable>

                        </HStack>
                        <View
                            mt={10}
                        >
                            <VStack>
                                <Text
                                    fontSize="xs"
                                    color="gray.600"
                                >
                                    Compre produtos variados
                                </Text>
                                <Input placeHolder="Buscar anúncio" search />
                            </VStack>
                        </View>

                        <View
                            mt={5}
                            h="100%"
                        >
                            <FlatList
                                data={productList}
                                keyExtractor={item => sha256(item.nome + item.valor)}
                                flex={1}
                                renderItem={({ item }) => (
                                    <HStack
                                        mb={4}
                                    >
                                        <ProductCard
                                            nome={item.nome}
                                            valor={item.valor}
                                            uri={item.uri}
                                            flex={0.5}
                                        />
                                        <Box
                                            w={4}
                                        />
                                        <ProductCard
                                            nome={item.nome}
                                            valor={item.valor}
                                            uri={item.uri}
                                            flex={0.5}
                                        />
                                    </HStack>
                                )}
                                contentContainerStyle={{
                                    flexGrow: 1
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                            <ProductCard />
                        </View>

                    </VStack>
                </SafeAreaView>
            </VStack>
        </View>
    )
}