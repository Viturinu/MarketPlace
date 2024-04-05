import { HStack, VStack, View, Text, Image, useTheme, Modal, FlatList, Flex, Pressable, Box, Row, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@assets/avatar.png"
import { Button } from "@components/Button";
import { Plus, Tag, ArrowRight } from "phosphor-react-native";
import { Input } from "@components/Input";
import { ProductCard } from "@components/ProductCard";
import sha256 from 'crypto-js/sha256';
import { ProfilePicture } from "@components/ProfilePicture";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@routes/app.routes";

export function Home() {

    const navigation = useNavigation<AppRoutesProps>();

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
        <VStack
            padding={4}
            bgColor="gray.200"
            flex={1}
        >
            <SafeAreaView
                style={{
                    flex: 1
                }}
            >

                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                >

                    <HStack
                        flex={0.5}
                    >
                        <ProfilePicture
                            size={11}
                            uri={Avatar}
                            borderColor="blue.100"
                        />
                        <VStack ml={2}>
                            <Text>
                                Boas vindas,
                            </Text>
                            <Text fontFamily="heading">
                                Maria!
                            </Text>
                        </VStack>
                    </HStack>

                    <Button
                        type="black"
                        title="Criar anúncio"
                        InternalIcon={Plus}
                        flex={0.4}
                    />
                </HStack>

                <Box
                    mt={4}
                    flex={1}
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

                        <TouchableOpacity
                            onPress={() => navigation.navigate("myProducts")}
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
                        </TouchableOpacity>

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

                    <FlatList
                        data={productList}
                        numColumns={2}
                        keyExtractor={item => sha256(item.nome + item.valor)}
                        renderItem={({ item }) => (
                            <ProductCard
                                nome={item.nome}
                                valor={item.valor}
                                uri={item.uri}
                                flex={0.5}
                                marginTop={12}
                                margin={6}
                            />
                        )}
                        style={{
                            marginTop: 10,
                        }}
                        contentContainerStyle={[
                            {
                                paddingBottom: 80,

                            },
                            productList.length === 0 && { flex: 1 },
                        ]}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <Center
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text color="gray.600" fontFamily="body"> Não há itens à venda por enquanto</Text>
                            </Center>
                        )}
                    />

                </Box>

            </SafeAreaView>
        </VStack>
    )
}