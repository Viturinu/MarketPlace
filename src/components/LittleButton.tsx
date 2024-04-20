import { Box, IBoxProps, Text } from "native-base";

type Props = IBoxProps & {
    type: "modalGray" | "modalBlue" | "darkGray" | "darkBlue";
    title: "usado" | "novo";
    fontSize: string;
}

export function LittleButton({ title, type, fontSize, ...rest }: Props) {
    return (
        <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            bgColor={type === "modalBlue" ? "blue.100" : type === "modalGray" ? "gray.300" : type === "darkBlue" ? "blue.200" : "gray.600"}
            rounded={9999}
            {...rest}
        >
            <Text
                color={type === "modalGray" ? "gray.500" : "gray.100"}
                fontFamily="heading"
                fontSize={fontSize}
            >
                {title.toUpperCase()}
            </Text>
        </Box>
    )
}