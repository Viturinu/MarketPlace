import { Header } from "@components/Header";
import { ProductCard } from "@components/ProductCard";
import { Box, Text, HStack, Select, CheckIcon, FlatList, Center } from "native-base";
import sha256 from 'crypto-js/sha256';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNativeStackProps } from "@routes/app.routes.nativestack";
import { api } from "@services/api";
import { productsProps } from "@dtos/ProductDTO";

export function MyProducts() {

    const [service, setService] = useState("Todos");

    const [productArray, setProductArray] = useState<productsProps[]>({} as productsProps[]);

    const navigation = useNavigation<AppRoutesNativeStackProps>();

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

    async function updateMyProducts() {
        try {
            const productArray = await api.get("/users/products");
            setProductArray(productArray.data);
            console.log(JSON.stringify(productArray));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updateMyProducts();
    }, [])

    return (
        <Box
            backgroundColor="gray.200"
            paddingX={4}
            flex={1}
        >
            <Header
                title="Meus anúncios"
                rightIcon="plus"
                rightIconFunction={() => navigation.navigate("newProduct")}
            />

            <HStack
                justifyContent="space-between"
                alignItems="center"
                mt={6}
            >
                <Text
                    fontSize="sm"
                    fontFamily="body"
                    color="gray.600"
                    ml={2}
                >
                    9 anúncios
                </Text>
                <Box>
                    <Select selectedValue={service} width={110} height={8} accessibilityLabel="Todos" placeholderTextColor="gray.600" placeholder="Todos" _selectedItem={{
                        bg: "gray.200",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item label="Cross Platform Development" value="cross" />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item label="Backend Development" value="backend" />
                    </Select>
                </Box>
            </HStack>

            <FlatList
                data={productArray}
                numColumns={2}
                keyExtractor={(item, index) => item.name + item.price + " - " + index}
                renderItem={({ item }) => (
                    <ProductCard
                        nome={item.name}
                        valor={item.price}
                        uri={item.product_images[1].path}
                        flex={0.5}
                        marginTop={12}
                        margin={6}
                        profilePicture={false}
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
    )
}