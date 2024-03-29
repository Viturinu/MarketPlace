import { Button as NativeBaseButton, IButtonProps, Text, HStack } from "native-base"
import { Icon } from "phosphor-react-native";

type Props = IButtonProps & {
    title: string;
    type: "black" | "blue" | "gray";
    InternalIcon?: Icon;
    InternalIconColor?: string;
    weight?: "fill" | "regular"
}

export function Button({ title, type, InternalIcon, InternalIconColor = "white", weight = "regular", ...rest }: Props) {
    return (
        <NativeBaseButton
            h={10}
            bgColor={type === "gray" ? "gray.300" : type === "blue" ? "blue.100" : "gray.700"}
            variant="ghost"
            _pressed={{
                bgColor: type === "gray" ? "gray.200" : type === "blue" ? "blue.400" : "gray.600"
            }}
            flex={1}
            {...rest}
        >
            <HStack
                alignItems="center"
            >
                {InternalIcon && <InternalIcon size={16} color={InternalIconColor} weight={weight} />}
                <Text
                    color={type === "gray" ? "gray.600" : type === "blue" ? "gray.100" : "gray.100"}
                    fontFamily="heading"
                    fontSize="sm"
                    ml={1}
                >
                    {title}
                </Text>
            </HStack>
        </NativeBaseButton>
    )
}