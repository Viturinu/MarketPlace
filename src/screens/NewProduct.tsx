import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import * as yup from "yup"
import { Box, Checkbox, HStack, Radio, ScrollView, Switch, Text, TextArea, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import { Controller, useForm } from "react-hook-form";
import { CustumTextArea } from "@components/CustumTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNativeStackProps } from "@routes/app.routes.nativestack";
import { maskCurrency } from "@utils/masks";

type FormData = {
    titulo: string;
    descricao: string;
    status: string;
    valor: string;
    troca: boolean;
    pagamento: [];

}

const schema = yup.object({
    titulo: yup.string().required("É necessário colocar um título para criar um registro"),
    descricao: yup.string().required("É necessário colocar uma descrição para criar um registro"),
    status: yup.string().required("É necessário dizer qual o status do produto"),
    valor: yup.string().required("É necessário colocar um valor para o novo produto"),
})

export function NewProduct() {

    const navigation = useNavigation<AppRoutesNativeStackProps>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    function handleNextStep({ titulo, descricao, status, valor, troca, pagamento }: FormData) {
        console.log("Entrou no avançar");
        console.log(titulo, descricao, status, valor, troca, pagamento);
        navigation.navigate("productPreview");
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
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <HStack>
                                <TouchableOpacity>
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
                                <TouchableOpacity>
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
                                <TouchableOpacity>
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
                                <TouchableOpacity>
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
                        </ScrollView>
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
                            name="titulo"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeHolder="Título do anúncio"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.titulo?.message}

                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="descricao"
                            render={({ field: { value, onChange } }) => (

                                <CustumTextArea
                                    placeholder="Descrição do produto"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.descricao?.message}
                                />
                            )}
                        />
                        <Box
                            backgroundColor="gray.200"
                        >
                            <Controller
                                control={control}
                                name="status"
                                render={({ field: { value, onChange } }) => (
                                    <Radio.Group
                                        name="newProduct"
                                        accessibilityLabel="newProduct"
                                        value={value}
                                        onChange={onChange}>
                                        <HStack
                                            mt={4}
                                        >
                                            <Radio value="new" my={1}>
                                                <Text>Produto novo</Text>
                                            </Radio>
                                            <Radio value="used" my={1} ml={4}>
                                                <Text>Produto usado</Text>
                                            </Radio>
                                        </HStack>
                                    </Radio.Group>
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
                                name="valor"
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        placeHolder=""
                                        value={value}
                                        onChangeText={value => onChange(maskCurrency(value))}

                                        errorMessage={errors.valor?.message}
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
                                    name="troca"
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
                                    name="pagamento"
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
                                            <Checkbox value="dinheiro" my={1}>
                                                <Text>Dinheiro</Text>
                                            </Checkbox>
                                            <Checkbox value="credito" my={1}>
                                                <Text>Crédito</Text>
                                            </Checkbox>
                                            <Checkbox value="deposito" my={1}>
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