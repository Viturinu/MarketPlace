import { Input as NativeBaseInput, IInputProps, Pressable, Icon } from "native-base"
import React, { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';

type Props = IInputProps & {
    placeHolder: string;
    password?: boolean
}

export function Input({ placeHolder, password, ...rest }: Props) {

    const [show, setShow] = useState(false)

    return (
        <NativeBaseInput
            mt={2}
            bgColor="gray.100"
            placeholder={placeHolder}
            type={password ? (show ? "text" : "password") : "text"}
            InputRightElement={password &&
                <Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                </Pressable>}
            {...rest}
        />
    )
}