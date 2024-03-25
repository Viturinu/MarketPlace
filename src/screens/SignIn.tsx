import { Center, VStack, Text, Image, View, ScrollView } from "native-base";
import Logo from "@assets/logo.png"
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type FormDataProps = {
    email: string;
    senha: string;
}

const schema = yup.object({
    email: yup.string().required("É necessário inserir o e-email para fazer entrar na aplicação.").email("É necessário inserir um e-mail válido"),
    senha: yup.string().required("É necessário inserir a senha.").min(6, "Senha contém mínimo de 6 dígitos")
})

export function SignIn() {

    const navigation = useNavigation<AuthNavigationRoutesProps>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(schema)
    });

    function handleCreateAccount() {
        navigation.navigate("SignUp");
    }

    function handleSignIn() {
        console.log("Tentando entrar.");
    }

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
                            name="senha"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeHolder="Senha"
                                    senha
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.senha?.message}
                                    onSubmitEditing={handleSubmit(handleSignIn)}
                                />
                            )}
                        />
                        <Button
                            title="Entrar"
                            type="blue"
                            mb={12}
                            onPress={handleSubmit(handleSignIn)}
                        />
                    </Center>
                </View>
                <View py={12} px={12} bgColor="gray.100" >
                    <Center justifyContent="Center" bgColor="gray.100">
                        <Text fontSize="2xs" color="gray.600" >
                            Ainda não tem acesso?
                        </Text>
                        <Button
                            title="Criar uma conta"
                            type="gray"
                            onPress={handleCreateAccount}
                        />
                    </Center>
                </View>
            </VStack>
        </ScrollView>

    )
}