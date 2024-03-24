import { Center, ScrollView, View, Image, Text, VStack } from "native-base";
import Logo from "@assets/logo.png"
import DefaultImage from "@assets/profileDefault.png"
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {

    return (
        <ScrollView bgColor="gray.200" flex={1}>
            <SafeAreaView >
                <View px={10}>
                    <Center mt={4}>
                        <Image
                            source={Logo}
                            defaultSource={Logo}
                            alt="Logo aplicação"
                            size="xs"
                            mb={2}
                        />
                        <Text fontFamily="heading" fontSize="lg" mb={2}>
                            Boas vindas!
                        </Text>
                        <Text fontFamily="body" color="gray.600" fontSize="xs" textAlign="center" mb={2}>
                            Crie sua conta e use o espaço para comprar {"\n"} itens variados e vender seus produtos
                        </Text>
                    </Center>
                </View>
                <View px={10}>
                    <Center>
                        <Pressable>
                            <Image
                                source={DefaultImage}
                                defaultSource={DefaultImage}
                                alt="Profile picture"
                                mb={2}
                                mt={4}
                            />
                        </Pressable>
                        <Input placeHolder="Nome" />
                        <Input placeHolder="Email" />
                        <Input placeHolder="Telefone" />
                        <Input placeHolder="Senha" password />
                        <Input placeHolder="Confirmar senha" password mb={3} />
                        <Button title="Criar" type="black" />
                    </Center>
                </View>
                <View my={10} px={10}>
                    <Center>
                        <Text>
                            Já tem uma conta?
                        </Text>
                        <Button title="Ir para o login" type="gray" />
                    </Center>

                </View>
            </SafeAreaView>
        </ScrollView>
    )
}