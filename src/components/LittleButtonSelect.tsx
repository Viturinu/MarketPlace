import { Box, HStack, IBoxProps, Text } from "native-base";

type Props = IBoxProps & {
    type: "modalGray" | "modalBlue";
    fontSize: string;
    isSelected: boolean;
}

export function LittleButtonSelect({ type, fontSize, isSelected, ...rest }: Props) {
    return (
        <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            bgColor={type === "modalBlue" ? "blue.100" : "gray.300"}
            rounded={9999}
            {...rest}
        >
            <HStack>
                <Text
                    color={type === "modalBlue" ? "gray.100" : "gray.500"}
                    fontFamily="heading"
                    fontSize={fontSize}
                >
                    {type === "modalBlue" ? "NOVO" : "USADO"}
                </Text>
                {
                    isSelected && <Box
                        width={2}
                        height={2}
                        borderRadius={9999}
                        backgroundColor={type === "modalBlue" ? "gray.100" : "gray.500"}
                        ml={2}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text
                            color={type === "modalBlue" ? "blue.100" : "gray.300"}
                            fontFamily="heading"
                            fontSize={fontSize}
                        >
                            x
                        </Text>
                    </Box>
                }

            </HStack>
        </Box>
    )
}