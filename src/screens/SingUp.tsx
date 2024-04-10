import { Center, ScrollView, View, Image, Text, useToast } from "native-base";
import Logo from "@assets/logo.png"
import DefaultImage from "@assets/profileDefault.png"
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import * as yup from "yup"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system"
import React, { useContext, useState } from "react";
import { api } from "@services/api";
import { maskCep, maskPhone } from "@utils/masks";
import { useAuth } from "@hooks/useAuth";

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

    const { signIn } = useAuth();

    const toast = useToast();

    const [userPhoto, setUserPhoto] = useState<ImagePicker.ImagePickerResult>();

    async function handleUserPhotoSelect() {
        try {
            const userPhoto = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4],
                quality: 1,
                allowsEditing: true
            }); //aqui está a uri da foto editada, no browser do aparelho, com as configurações de corte e dimensões;

            if (userPhoto.canceled) return;

            setUserPhoto(userPhoto);
        } catch (error) {
            console.log(error);
        }
    }

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    async function handleSignUp({ nome, email, telefone, senha }: FormData) {
        try {

            let userPhotoForm = new FormData();
            if (userPhoto === undefined || userPhoto.canceled || userPhoto.assets[0].uri === "") {
                return toast.show({
                    title: "Você precisa inserir uma foto para fazer login",
                    placement: "top",
                    bgColor: "red.700"
                })
            }
            if (userPhoto !== undefined) {
                if (userPhoto.assets[0].uri) {
                    const photoInfo = await FileSystem.getInfoAsync(userPhoto.assets[0].uri, { md5: true, size: true });

                    if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
                        return (
                            toast.show({
                                title: "A imagem selecionada é muito grande. Por favor, selecione imagem de tamanho menor que 5MB",
                                placement: "top",
                                bgColor: "red.700"
                            })
                        )
                    }

                    const photoExtension = userPhoto.assets[0].uri.split(".").pop(); //split na uri onde tem um ponto, e pop no ultimop elemento, no caso ficará a extensão

                    const photoFile = {
                        name: `${nome}.${photoExtension}`.toLowerCase(),
                        uri: userPhoto.assets[0].uri,
                        type: `${userPhoto.assets[0].type}/${photoExtension}`
                    } as any; //tem que colocar any, exigência do FormData

                    userPhotoForm.append("avatar", photoFile);
                } //caso tenha foto
            }
            userPhotoForm.append("name", nome);
            userPhotoForm.append("email", email);
            userPhotoForm.append("tel", telefone);
            userPhotoForm.append("password", senha);

            await api.post("/users", userPhotoForm, {
                headers: {
                    "Content-Type": "multipart/form-data" //pra afirmar que não é mais um conteúdo JSON, e sim um multipart
                }
            });

            toast.show({
                title: "Usuário criado com sucesso.",
                placement: "top",
                bgColor: "green.500"
            })

            await signIn(email, senha);
        } catch (error) {
            console.log(error);
        }
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
                        <TouchableOpacity
                            onPress={handleUserPhotoSelect}
                        >
                            {
                                userPhoto ?
                                    <Image
                                        source={{ uri: userPhoto.assets[0].uri }}
                                        alt="Profile picture"
                                        mb={2}
                                        mt={4}
                                        borderRadius={100}
                                        width={100}
                                        height={100}
                                    /> : <Image
                                        source={DefaultImage}
                                        defaultSource={DefaultImage}
                                        alt="Profile picture"
                                        mb={2}
                                        mt={4}
                                    />
                            }

                        </TouchableOpacity>

                        <Controller
                            control={control}
                            name="nome"
                            render={({ field: { value, onChange } }) => (
                                <>
                                    <Input
                                        placeHolder="Nome"
                                        value={value}
                                        onChangeText={onChange}
                                        errorMessage={errors.nome?.message}

                                    />
                                </>
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
                                    value={value}
                                    onChangeText={value => onChange(maskPhone(value))}
                                    maxLength={14}
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
                            width="full"
                            mt={3}
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
                            width="full"
                            mt={3}
                        />
                    </Center>

                </View>
            </SafeAreaView>
        </ScrollView>
    )
}