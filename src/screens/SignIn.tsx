import { Center, VStack, Text, Image, View } from "native-base";
import Logo from "@assets/logo.png"
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
    return (
        <VStack flex={1}>
            <View flex={1} px={12} bgColor="gray.200" borderRadius="2xl">
                <Center mt={24}>
                    <Image
                        source={Logo}
                        defaultSource={Logo}
                        alt="Logo aplicação"
                    />
                    <Text fontFamily="heading" fontSize="2xl" color="gray.900" bold>
                        marketspace
                    </Text>
                    <Text fontFamily="body" fontSize="sm" color="gray.500">
                        Seu espaço de compra e venda
                    </Text>
                </Center>
                <Center mt={50}>
                    <Text fontSize="xs" color="gray.600">
                        Acesse sua conta
                    </Text>
                    <Input placeHolder="Email" />
                    <Input placeHolder="Senha" password />
                </Center>
            </View>
            <View px={12} bgColor="gray.100" >
                <Center my={35} bgColor="gray.100">
                    <Text fontSize="2xs" bgColor="gray.100" color="gray.600">
                        Ainda não tem acesso?
                    </Text>
                    <Button />
                </Center>
            </View>
        </VStack>
    )
}