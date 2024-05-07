import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import * as yup from "yup"
import { Box, Checkbox, FlatList, HStack, ScrollView, Switch, Text, useToast, Image, VStack, Icon, useTheme, View } from "native-base";
import shortid from 'shortid';
import { Plus, X } from "phosphor-react-native";
import { Controller, useForm } from "react-hook-form";
import { CustumTextArea } from "@components/CustumTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNativeStackProps } from "@routes/app.routes.nativestack";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system"
import { maskCurrency } from "@utils/masks";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { RadioControlled } from "@components/RadioControlled";
import { photoFileProps, productUploadProps } from "@dtos/ProductDTO";

const schema = yup.object({
    name: yup.string().required("É necessário colocar um título para criar um registro"),
    description: yup.string().required("É necessário colocar uma descrição para criar um registro"),
    is_new: yup.string().required("É necessário dizer qual o status do produto"),
    price: yup.string().required("É necessário colocar um valor para o novo produto"),
})

export function NewProduct() {

    const navigation = useNavigation<AppRoutesNativeStackProps>();

    const { user } = useAuth();

    const { colors } = useTheme();

    const toast = useToast();

    const [pictureFiles, setPictureFiles] = useState<photoFileProps[]>([]);

    const { control, handleSubmit, formState: { errors } } = useForm<productUploadProps>({
        resolver: yupResolver(schema)
    })

    async function pickImage() {
        try {

            if (pictureFiles.length === 4) { //chegou em 4 fotos? Para!
                return (
                    toast.show({
                        title: "Limite máximo de imagens alcançados",
                        bgColor: "red.700",
                        placement: "top"
                    })
                )
            }

            const userPhoto = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4],
                quality: 1,
                allowsEditing: true
            }); //aqui está a uri da foto editada, no browser do aparelho, com as configurações de corte e dimensões;

            if (userPhoto.canceled) return;

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

                    const pictureFile = {
                        id: shortid.generate(),
                        name: `${user.name}-${userPhoto.assets[0].fileName}.${photoExtension}`.toLowerCase(),
                        uri: userPhoto.assets[0].uri,
                        type: `${userPhoto.assets[0].type}/${photoExtension}`
                    } as any; //tem que colocar any, exigência do FormData

                    setPictureFiles([...pictureFiles, pictureFile]);//Atualizando estado com imagens pra fazer o upload
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function removeProductPicture(productPicture: photoFileProps) {
        const newArray = pictureFiles.filter(item => item.id !== productPicture.id);
        setPictureFiles(newArray);
    }

    async function handleNextStep({ name, description, is_new, price, accept_trade, payment_methods }: productUploadProps) {
        try {

            if (pictureFiles.length === 0) {
                return toast.show({
                    title: "Você precisa inserir pelo menos uma imagem do seu produto.",
                    placement: "top",
                    bgColor: "red.700"
                })
            }

            navigation.navigate("productPreview", {
                images: pictureFiles,
                name,
                description,
                is_new,
                price,
                accept_trade,
                payment_methods
            });

        } catch (error) {
            console.log(JSON.stringify(error) + " - Aqui no upload do produto");
        }
    }

    return (
        <Box
            flex={1}
            backgroundColor="gray.200"
        >
            <Header
                title="Criar anúncio"
                backIcon
                backIconFunction={() => navigation.goBack()}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                mt={4}>
                <Box
                    paddingX={4}
                >
                    <VStack
                        mt={4}
                    >
                        <Text
                            fontFamily="heading"
                            fontSize="sm"
                            color="gray.600"
                        >
                            Imagens
                        </Text>
                        <Text
                            fontFamily="body"
                            fontSize="xs"
                            color="gray.500"
                        >
                            Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
                        </Text>
                    </VStack>
                    <Box>
                        <FlatList
                            data={pictureFiles}
                            keyExtractor={item => `${item.id} - ${item.name}`}
                            ListEmptyComponent={() =>
                                <TouchableOpacity
                                    onPress={pickImage}
                                >
                                    <Box
                                        width={100}
                                        height={100}
                                        backgroundColor="gray.300"
                                        borderRadius={6}
                                        alignItems="center"
                                        justifyContent="center"
                                        mt={4}
                                        mr={2}
                                    >
                                        <Plus color="#9F9BA1" />
                                    </Box>
                                </TouchableOpacity>
                            }
                            renderItem={({ item, index }) => {
                                // Verifica se este é o último item na lista
                                if (index === pictureFiles.length - 1) {
                                    return (
                                        <HStack>
                                            <HStack
                                                width={100}
                                                height={100}
                                                justifyContent="flex-end"
                                                borderRadius={6}
                                                mt={4}
                                                mr={2}
                                            >
                                                <View
                                                    zIndex={1}>
                                                    <TouchableOpacity
                                                        onPress={() => removeProductPicture(item)}
                                                    >
                                                        <Box
                                                            width={4}
                                                            height={4}
                                                            mt={1}
                                                            mr={1}
                                                            backgroundColor="gray.600"
                                                            borderRadius={100}
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            zIndex={1}
                                                        >
                                                            <X size={12} color={colors.gray[400]} />
                                                        </Box>
                                                    </TouchableOpacity>
                                                </View>
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    alt={"foto do produto - " + index}
                                                    height="100%"
                                                    width="100%"
                                                    position="absolute"
                                                />

                                            </HStack>

                                            <TouchableOpacity
                                                onPress={pickImage}
                                            >
                                                <Box
                                                    width={100}
                                                    height={100}
                                                    backgroundColor="gray.300"
                                                    borderRadius={6}
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    mt={4}
                                                    mr={2}
                                                >
                                                    <Plus color="#9F9BA1" />
                                                </Box>
                                            </TouchableOpacity>
                                        </HStack>
                                    );
                                } else {
                                    // Renderiza os itens normais
                                    return (

                                        <HStack
                                            width={100}
                                            height={100}
                                            justifyContent="flex-end"
                                            borderRadius={6}
                                            mt={4}
                                            mr={2}
                                        >
                                            <View
                                                zIndex={1}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => removeProductPicture(item)}
                                                >
                                                    <Box
                                                        width={4}
                                                        height={4}
                                                        mt={1}
                                                        mr={1}
                                                        backgroundColor="gray.600"
                                                        borderRadius={100}
                                                        justifyContent="center"
                                                        alignItems="center"
                                                    >
                                                        <X size={12} color={colors.gray[400]} />
                                                    </Box>
                                                </TouchableOpacity>
                                            </View>
                                            <Image
                                                source={{ uri: item.uri }}
                                                alt={"foto do produto - " + index}
                                                height="100%"
                                                width="100%"
                                                position="absolute"
                                            />
                                        </HStack>

                                    );
                                }
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </Box>

                    <Box
                        mt={6}
                    >
                        <Text
                            fontFamily="heading"
                            fontSize="sm"
                            color="gray.600"
                        >
                            Sobre o produto
                        </Text>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeHolder="Título do anúncio"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { value, onChange } }) => (

                                <CustumTextArea
                                    placeholder="Descrição do produto"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.description?.message}
                                />
                            )}
                        />
                        <Box
                            backgroundColor="gray.200"
                        >
                            <Controller
                                control={control}
                                name="is_new"
                                render={({ field: { value, onChange } }) => (
                                    <RadioControlled
                                        FirstProduct="Produto novo"
                                        SecondProduct="Produto usado"
                                        onChange={onChange}
                                        value={value}
                                        ErrorMessage={errors.is_new?.message}
                                    />
                                )}
                            />
                        </Box>
                        <VStack
                            mt={2}
                        >
                            <Text
                                fontFamily="heading"
                                color="gray.600"
                                fontSize="sm"
                                mt={4}
                            >
                                Venda
                            </Text>
                            <Controller
                                control={control}
                                name="price"
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        placeHolder=""
                                        value={value}
                                        onChangeText={value => onChange(maskCurrency(value))}

                                        errorMessage={errors.price?.message}
                                        money />

                                )}
                            />
                        </VStack>

                        <VStack
                            mt={2}
                        >
                            <Text
                                fontFamily="heading"
                                color="gray.600"
                                fontSize="xs"
                                mt={4}
                            >
                                Aceita trocas?
                            </Text>

                            <HStack
                                w="50%"
                                h={6}
                                mt={2}
                            >
                                <Controller
                                    control={control}
                                    name="accept_trade"
                                    render={({ field: { value, onChange } }) => (
                                        <Switch
                                            size="lg"
                                            value={value}
                                            onValueChange={onChange} />
                                    )}
                                />
                            </HStack>
                        </VStack>

                        <VStack
                            mt={3}
                        >
                            <Text
                                fontFamily="heading"
                                color="gray.600"
                                fontSize="xs"
                            >
                                Meios de pagamento aceitos
                            </Text>
                            <Box
                                mt={1}
                            >
                                <Controller
                                    control={control}
                                    name="payment_methods"
                                    render={({ field: { value, onChange } }) => (
                                        <Checkbox.Group
                                            onChange={onChange}
                                            value={value}
                                            accessibilityLabel="choose payment methods">
                                            <Checkbox value="boleto" my={1}>
                                                <Text>Boleto</Text>
                                            </Checkbox>
                                            <Checkbox value="pix" my={1}>
                                                <Text>Pix</Text>
                                            </Checkbox>
                                            <Checkbox value="cash" my={1}>
                                                <Text>Dinheiro</Text>
                                            </Checkbox>
                                            <Checkbox value="card" my={1}>
                                                <Text>Crédito</Text>
                                            </Checkbox>
                                            <Checkbox value="deposit" my={1}>
                                                <Text>Depósito</Text>
                                            </Checkbox>
                                        </Checkbox.Group>
                                    )}
                                />
                            </Box>
                        </VStack>


                    </Box>
                </Box>
            </ScrollView>
            <HStack
                height={12}
                mt={6}
                paddingX={4}
            >
                <Button
                    title="Cancelar"
                    type="gray"
                    weight="fill"
                    flex={1}
                    onPress={() => navigation.goBack()}
                />

                <Button
                    title="Avançar"
                    type="black"
                    weight="fill"
                    ml={2}
                    flex={1}
                    onPress={handleSubmit(handleNextStep)}
                />
            </HStack>
        </Box>
    )
}