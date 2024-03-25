import { Center, ScrollView, View, Image, Text } from "native-base";
import Logo from "@assets/logo.png"
import DefaultImage from "@assets/profileDefault.png"
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import * as yup from "yup"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    confirmar_senha: string;

}

const schema = yup.object({
    nome: yup.string().required("É necessário colocar um nome para criar um registro"),
    email: yup.string().required("É necessário colocar um email para criar um registro").email("E-mail inválido"),
    telefone: yup.string().required("É necessário colocar um telefone para criar um registro"),
    senha: yup.string().required("É necessário colocar uma senha para criar um registro").min(6, "A senha precisa ter um mínimo de 6 digitos"),
    confirmar_senha: yup.string().required("É necessário confirmar a senha para criar um registro").oneOf([yup.ref("senha")], "A confirmação da senha não confere")
})

export function SignUp() {

    const navigation = useNavigation<AuthNavigationRoutesProps>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    function handleSignUp() {
        console.log("Entrou no SignUp")
    }

    function handleGoBack() {
        navigation.navigate("SignIn");
    }

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
                        <Controller
                            control={control}
                            name="nome"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeHolder="Nome"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.nome?.message}

                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeHolder="Email"
                                    keyboardType="email-address"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="telefone"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeHolder="Telefone"
                                    keyboardType="phone-pad"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.telefone?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="senha"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeHolder="Senha"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.senha?.message}
                                    senha
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="confirmar_senha"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    mb={3}
                                    placeHolder="Confirmar senha"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.confirmar_senha?.message}
                                    senha
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                />
                            )}
                        />
                        <Button
                            title="Criar"
                            type="black"
                            onPress={handleSubmit(handleSignUp)}
                        />
                    </Center>
                </View>
                <View my={10} px={10}>
                    <Center>
                        <Text>
                            Já tem uma conta?
                        </Text>
                        <Button
                            title="Ir para o login"
                            type="gray"
                            onPress={handleGoBack}
                        />
                    </Center>

                </View>
            </SafeAreaView>
        </ScrollView>
    )
}