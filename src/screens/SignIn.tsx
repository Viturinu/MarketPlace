import { Center, VStack, Text, Image, View, ScrollView } from "native-base";
import Logo from "@assets/logo.png"
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
    return (
        <ScrollView>
            <VStack flex={1} bgColor="gray.200">
                <View flex={1} px={12} bgColor="gray.200" borderBottomRadius="2xl" zIndex={1} top={4} >
                    <Center mt={20}>
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
                        <Button title="Entrar" type="blue" mb={12} />
                    </Center>
                </View>
                <View py={12} px={12} bgColor="gray.100" >
                    <Center justifyContent="Center" bgColor="gray.100">
                        <Text fontSize="2xs" color="gray.600" >
                            Ainda não tem acesso?
                        </Text>
                        <Button title="Criar uma conta" type="gray" />
                    </Center>
                </View>
            </VStack>
        </ScrollView>

    )
}