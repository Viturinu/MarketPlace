import { TextArea, ITextAreaProps, FormControl } from "native-base";

type Props = ITextAreaProps & {
    errorMessage?: string;
}

export function CustumTextArea({ errorMessage, isInvalid, ...rest }: Props) {

    const invalid = !!errorMessage || isInvalid; //aqui setamos uma variável invalid baseado em msg de erro e invalid que o proprio yup passa pra Button, e aí jogamos no FormControl

    return (
        <FormControl>
            <TextArea
                autoCompleteType={undefined}
                backgroundColor="gray.100"
                borderWidth={0}
                mt={4}
                placeholder="Descrição do produto"
                fontSize="md"
                minHeight={40}
                _focus={{
                    borderWidth: 1,
                    borderColor: "green.700"
                }}
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.700"
                }}
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