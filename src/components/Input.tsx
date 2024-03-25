import { Input as NativeBaseInput, IInputProps, Pressable, Icon, FormControl } from "native-base"
import React, { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';

type Props = IInputProps & {
    placeHolder: string;
    senha?: boolean
    errorMessage?: string;
}

export function Input({ placeHolder, senha = false, isInvalid, errorMessage, ...rest }: Props) {

    const [show, setShow] = useState(false)

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
                InputRightElement={senha &&
                    <Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>}
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