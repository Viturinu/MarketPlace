import { Input, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
    errorMessage?: string;
}

export function CustumTextArea({ errorMessage, isInvalid, ...rest }: Props) {

    const invalid = !!errorMessage || isInvalid; //aqui setamos uma variável invalid baseado em msg de erro e invalid que o proprio yup passa pra Button, e aí jogamos no FormControl
    console.log(errorMessage)
    return (
        <FormControl isInvalid={invalid}>
            <Input
                textAlignVertical="top"
                multiline
                backgroundColor="gray.100"
                borderWidth={0}
                placeholder="Descrição do produto"
                height={40}
                mt={4}
                fontSize="md"
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