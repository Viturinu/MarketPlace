import { FormControl, useTheme } from "native-base"
import MaskInput, { MaskInputProps } from 'react-native-mask-input';
import { StyleSheet } from "react-native";

type Props = MaskInputProps & {
    errorMessage?: string;
    filterFunction?: () => void;
}

export function InputMask({ errorMessage, ...rest }: Props) {

    const { colors, fontSizes } = useTheme();

    const invalid = !!errorMessage; //aqui setamos uma variável invalid baseado em msg de erro e invalid que o proprio yup passa pra Button, e aí jogamos no FormControl

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            borderWidth: 0,
            borderRadius: 6,
            marginTop: 6,
            fontSize: fontSizes.md,
            backgroundColor: colors.gray[100],
        }
    });

    return (
        <FormControl isInvalid={invalid}>
            <MaskInput
                style={styles.container}
                placeholder="Telefone"
                placeholderTextColor={colors.gray[400]}
                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                {...rest}
            />
            <FormControl.ErrorMessage
                color="red.700"
            >
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>

    )
}