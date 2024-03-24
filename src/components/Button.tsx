import { Button as NativeBaseButton, IButtonProps, Text } from "native-base"

type Props = IButtonProps & {
    title: string;
}

export function Button({ title }: Props) {
    return (
        <NativeBaseButton
            flex={1}
            w="full"
            h={14}
            bgColor="gray.300"
            borderColor="blue.200"
            borderWidth={1}
        >
            <Text
                color="gray.700"
                fontFamily="heading"
                fontSize="sm"
            >
                Teste
            </Text>
        </NativeBaseButton>
    )
}