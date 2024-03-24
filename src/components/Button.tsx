import { Button as NativeBaseButton, IButtonProps, Text } from "native-base"

type Props = IButtonProps & {
    title: string;
    type: "black" | "blue" | "gray"
}

export function Button({ title, type, ...rest }: Props) {
    return (
        <NativeBaseButton
            w="full"
            h={11}
            mt={4}
            bgColor={type === "gray" ? "gray.300" : type === "blue" ? "blue_light" : "gray.700"}
            variant="ghost"
            _pressed={{
                bgColor: type === "gray" ? "gray.200" : type === "blue" ? "blue.400" : "gray.600"
            }}
            {...rest}
        >
            <Text
                color={type === "gray" ? "gray.600" : type === "blue" ? "gray.100" : "gray.100"}
                fontFamily="heading"
                fontSize="sm"
            >
                {title}
            </Text>
        </NativeBaseButton>
    )
}