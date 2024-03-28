import { Box, HStack, Icon, Text, useTheme } from "native-base";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

type Props = {
    tipo: "boleto" | "pix" | "dinheiro" | "credito" | "deposito";
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
                            tipo === "dinheiro" ? <Money size={18} color={iconColor} weight="regular" /> :
                                tipo === "credito" ? <CreditCard size={18} color={iconColor} weight="regular" /> :
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
                                tipo === "dinheiro" ? "Dinheiro" :
                                    tipo === "credito" ? "Cartão de Crédito" :
                                        "Depósito Bancário"
                    }
                </Text>
            </Box>
        </HStack>
    )
}