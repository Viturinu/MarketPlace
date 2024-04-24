import { Box, HStack, Icon, Text, useTheme } from "native-base";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

type Props = {
    tipo: "boleto" | "pix" | "cash" | "card" | "deposit";
}

export function PaymentMethod({ tipo }: Props) {

    const { colors } = useTheme();
    const iconColor = colors.gray[600];

    return (
        <HStack
            alignItems="center"
        >
            <Box>
                {
                    tipo === "boleto" ? <Barcode size={18} color={iconColor} weight="regular" /> :
                        tipo === "pix" ? <QrCode size={18} color={iconColor} weight="regular" /> :
                            tipo === "cash" ? <Money size={18} color={iconColor} weight="regular" /> :
                                tipo === "card" ? <CreditCard size={18} color={iconColor} weight="regular" /> :
                                    <Bank size={18} color={iconColor} weight="regular" />
                }
            </Box>
            <Box
                ml={2}
            >
                <Text
                    color="gray.600"
                    fontSize="sm"
                    fontFamily="body"
                >
                    {
                        tipo === "boleto" ? "Boleto" :
                            tipo === "pix" ? "Pix" :
                                tipo === "cash" ? "Dinheiro" :
                                    tipo === "card" ? "Cartão de Crédito" :
                                        "Depósito Bancário"
                    }
                </Text>
            </Box>
        </HStack>
    )
}