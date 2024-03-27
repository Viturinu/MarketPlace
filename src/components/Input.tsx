import { Input as NativeBaseInput, IInputProps, Pressable, Icon, FormControl, Text, HStack, Divider, useTheme, Modal, VStack, Switch, Checkbox } from "native-base"
import React, { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import { Button } from "./Button";
import { LittleButton } from "./LittleButton";

type Props = IInputProps & {
    placeHolder: string;
    senha?: boolean
    errorMessage?: string;
    search?: boolean;
    filterFunction?: () => void;
}

export function Input({ placeHolder, senha = false, isInvalid, errorMessage, search, filterFunction, ...rest }: Props) {

    const { colors } = useTheme();

    const [show, setShow] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const invalid = !!errorMessage || isInvalid; //aqui setamos uma variável invalid baseado em msg de erro e invalid que o proprio yup passa pra Button, e aí jogamos no FormControl

    return (
        <FormControl isInvalid={invalid}>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            >
                <Modal.Content
                    width="full"
                    height="full"
                    roundedTop={15}
                    backgroundColor="gray.200"
                    marginBottom={0}
                    marginTop="auto"
                >
                    <Modal.Body
                        padding={6}
                    >
                        <Text
                            fontFamily="heading"
                            fontSize="lg"
                            mt={4}
                        >
                            Filtrar anúncios
                        </Text>
                        <VStack>
                            <Text
                                fontFamily="heading"
                                color="gray.600"
                                fontSize="sm"
                                mt={4}
                            >
                                Condição
                            </Text>

                            <HStack
                                w="50%"
                                h={6}
                                mt={2}
                            >
                                <LittleButton
                                    title="Novo"
                                    backgroundColor="blue.100"
                                    color="gray.100"
                                />
                                <LittleButton
                                    title="Novo"
                                    backgroundColor="gray.300"
                                    color="gray.400"
                                    ml={2}
                                />
                            </HStack>
                        </VStack>

                        <VStack
                            mt={2}
                        >
                            <Text
                                fontFamily="heading"
                                color="gray.600"
                                fontSize="sm"
                                mt={4}
                            >
                                Aceita trocas?
                            </Text>

                            <HStack
                                w="50%"
                                h={6}
                                mt={2}
                            >
                                <Switch size="lg" />
                            </HStack>
                        </VStack>

                        <VStack
                            mt={2}
                        >
                            <Text
                                fontFamily="heading"
                                color="gray.600"
                                fontSize="sm"
                                mt={4}
                            >
                                Meios de pagamento aceitos
                            </Text>

                            <VStack
                                mt={2}
                            >
                                <Checkbox value="Boleto" colorScheme="purple" defaultIsChecked>
                                    Boleto
                                </Checkbox>
                                <Checkbox value="Pix" colorScheme="purple" defaultIsChecked>
                                    Pix
                                </Checkbox>
                                <Checkbox value="Dinheiro" colorScheme="purple" defaultIsChecked>
                                    Dinheiro
                                </Checkbox>
                                <Checkbox value="Credito" colorScheme="purple" defaultIsChecked>
                                    Cartão de crédito
                                </Checkbox>
                                <Checkbox value="Deposito" colorScheme="purple" defaultIsChecked>
                                    Depósito Bancário
                                </Checkbox>
                            </VStack>
                        </VStack>

                        <HStack
                            mt={6}
                        >
                            <Button
                                flex={1}
                                onPress={() => {
                                    setShowModal(false);
                                }}
                                title="Resetar filtros"
                                type="gray"
                            >
                                Cancel
                            </Button>
                            <Button
                                flex={1}
                                ml={2}
                                onPress={() => {
                                    setShowModal(false);
                                }}
                                title="Aplicar filtros"
                                type="black"
                            >
                                Save
                            </Button>
                        </HStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            <NativeBaseInput
                bgColor="gray.100"
                borderWidth={0}
                borderRadius={6}
                mt={2}
                placeholder={placeHolder}
                fontSize="md"
                type={senha ? (show ? "text" : "password") : "text"}
                InputRightElement={senha ?
                    <Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable> : search &&
                    <HStack
                        justifyContent="center"
                        alignItems="center"
                        mr={3}
                    >
                        <Pressable>
                            <Icon as={MagnifyingGlass} color={colors.gray[700]} />
                        </Pressable >
                        <Divider
                            orientation="vertical"
                            mx="3"
                            color="gray.700"
                            thickness={1}
                            h={4}
                        />
                        <Pressable
                            onPress={() => setShowModal(true)}
                        >
                            <Icon as={Sliders} color={colors.gray[700]} />
                        </Pressable>
                    </HStack>

                }
                _focus={{
                    borderWidth: 1,
                    borderColor: "green.700"
                }}
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.700"
                }}
                {...rest}
            />
            <FormControl.ErrorMessage
                color="red.700"
            >
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>

    )
}