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
    money?: boolean;
    showModal?: () => void;
}

export function Input({ placeHolder, senha = false, isInvalid, errorMessage, search, money = false, showModal, ...rest }: Props) {

    const { colors } = useTheme();

    const [show, setShow] = useState(false);

    const invalid = !!errorMessage || isInvalid; //aqui setamos uma variável invalid baseado em msg de erro e invalid que o proprio yup passa pra Button, e aí jogamos no FormControl

    return (
        <FormControl isInvalid={invalid}>
            <NativeBaseInput
                bgColor="gray.100"
                borderWidth={0}
                borderRadius={6}
                mt={2}
                placeholder={placeHolder}
                fontSize="md"
                type={senha ? (show ? "text" : "password") : "text"}
                keyboardType={money ? "numeric" : "default"}
                InputLeftElement={
                    money ?
                        <Text ml={2}> R$ </Text>
                        : <></>}
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
                            onPress={showModal}
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