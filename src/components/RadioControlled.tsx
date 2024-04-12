import { FormControl, HStack, Radio, Text } from "native-base";

type Props = {
    value: string;
    onChange: (...event: any[]) => void;
    FirstProduct: string;
    SecondProduct: string;
    ErrorMessage?: string;
}

export function RadioControlled({ value, onChange, FirstProduct, SecondProduct, ErrorMessage }: Props) {
    return (
        <FormControl isInvalid={!!ErrorMessage}>
            <Radio.Group
                name="newProduct"
                accessibilityLabel="newProduct"
                value={value}
                onChange={onChange}>
                <HStack
                    mt={4}
                >
                    <Radio value="new" my={1}>
                        <Text>{FirstProduct}</Text>
                    </Radio>
                    <Radio value="used" my={1} ml={4}>
                        <Text>{SecondProduct}</Text>
                    </Radio>
                </HStack>
            </Radio.Group>
            <FormControl.ErrorMessage
                color="red.700"
            >
                {ErrorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )

}