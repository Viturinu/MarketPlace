import { Modal, Text, VStack, HStack, Checkbox, Switch } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LittleButtonSelect } from "./LittleButtonSelect";
import { Button } from "./Button";
import { string } from "yup";

type Props = {
    acceptTrade: boolean;
    setAcceptTrade: (variable: boolean) => void;
    paymentMethods: string[];
    setPaymentMethods: (variable: string[]) => void;
    isNew: boolean;
    setIsNew: (variable: boolean) => void;
    showModal: boolean;
    setShowModal: (variable: boolean) => void;
    handleFilterApply: () => void;

}

export function ModalFilter({ showModal, setShowModal, acceptTrade, setAcceptTrade, paymentMethods, setPaymentMethods, isNew, setIsNew, handleFilterApply }: Props) {
    return (
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
                            flex={1}
                            mt={2}
                        >
                            <TouchableOpacity
                                onPress={() => setIsNew(true)}
                            >
                                <LittleButtonSelect
                                    type="modalBlue"
                                    isSelected={isNew}
                                    fontSize="sm"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsNew(false)}
                            >
                                <LittleButtonSelect
                                    type="modalGray"
                                    isSelected={!isNew}
                                    fontSize="sm"
                                    ml={2}
                                />
                            </TouchableOpacity>
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
                            <Switch value={acceptTrade} onValueChange={setAcceptTrade} size="lg" />
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
                            <Checkbox.Group
                                onChange={values => {
                                    setPaymentMethods(values || [])
                                }}
                                defaultValue={paymentMethods}
                                value={paymentMethods}
                                accessibilityLabel="choose payment methods">
                                <Checkbox value="boleto" colorScheme="blue">
                                    Boleto
                                </Checkbox>
                                <Checkbox value="pix" colorScheme="blue">
                                    Pix
                                </Checkbox>
                                <Checkbox value="cash" colorScheme="blue">
                                    Dinheiro
                                </Checkbox>
                                <Checkbox value="card" colorScheme="blue">
                                    Cartão de crédito
                                </Checkbox>
                                <Checkbox value="deposit" colorScheme="blue">
                                    Depósito Bancário
                                </Checkbox>
                            </Checkbox.Group>
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
                            onPress={handleFilterApply}
                            title="Aplicar filtros"
                            type="black"
                        >
                            Save
                        </Button>
                    </HStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}