import { Center, Spinner } from "native-base";

export function Loading() {
    return (
        <Center flex={1} bgColor="blue_light">
            <Spinner color="gray.700" />
        </Center>
    );
}