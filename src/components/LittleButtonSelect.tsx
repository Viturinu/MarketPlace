import { Box, HStack, Text } from "native-base";
import { X } from "phosphor-react-native";

type Props = {
    type: "modalBlue" | "modalGray";
    fontSize: string;
    isSelected: boolean;
}

export function LittleButtonSelect({ type, fontSize, isSelected }: Props) {
    return (

        <HStack
            alignItems="center"
            justifyContent="center"
            bgColor={type === "modalBlue" ? "blue.100" : "gray.300"}
            rounded={100}
            height={8}
            width={20}
        >
            <Text
                color={type === "modalBlue" ? "gray.100" : "gray.500"}
                fontFamily="heading"
                fontSize={fontSize}
            >
                {type === "modalBlue" ? "NOVO" : "USADO"}
            </Text>
            {
                isSelected && <Box
                    width={3}
                    height={3}
                    borderRadius={9999}
                    backgroundColor={type === "modalBlue" ? "gray.100" : "gray.500"}
                    ml={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <X size={8} color={type === "modalBlue" ? "#647AC7" : "#D9D8DA"} />
                </Box>
            }

        </HStack>
    )
}