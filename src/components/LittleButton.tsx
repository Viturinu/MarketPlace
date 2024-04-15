import { Box, IBoxProps, Text } from "native-base";

type Props = IBoxProps & {
    title: string;
    color: string;
    fontSize: string;
}

export function LittleButton({ title, color, fontSize, ...rest }: Props) {
    return (
        <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            rounded={9999}
            {...rest}
        >
            <Text
                color={color}
                fontFamily="heading"
                fontSize={fontSize}
            >
                {title.toUpperCase()}
            </Text>
        </Box>
    )
}