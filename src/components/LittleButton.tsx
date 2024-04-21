import { Box, IBoxProps, Text } from "native-base";

type Props = IBoxProps & {
    type: "darkGray" | "darkBlue";
    fontSize: string;
}

export function LittleButton({ type, fontSize, ...rest }: Props) {
    return (
        <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            bgColor={type === "darkBlue" ? "blue.200" : "gray.300"}
            rounded={9999}
            {...rest}
        >
            <Text
                color={type === "darkBlue" ? "gray.100" : "gray.500"}
                fontFamily="heading"
                fontSize={fontSize}
            >
                {type === "darkBlue" ? "NOVO" : "USADO"}
            </Text>
        </Box>
    )
}