import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, PencilSimpleLine, Plus } from "phosphor-react-native"
import { View, Text, HStack } from "native-base";
import { TouchableOpacity } from "react-native";

type Props = {
    title?: string;
    rightIcon?: "plus" | "edit";
    rightIconFunction?: () => void;
    backIcon?: boolean;
    backIconFunction?: () => void;
}

export function Header({ title, rightIcon, rightIconFunction, backIcon = false, backIconFunction }: Props) {

    return (
        <SafeAreaView>
            <HStack
                justifyContent="space-between"
                alignItems="center"
                paddingX={4}
                mt={5}
            >

                <View>
                    {backIcon ?
                        <TouchableOpacity
                            onPress={backIconFunction}
                        >
                            <ArrowLeft />
                        </TouchableOpacity> : <View h={4} w={6} />}
                </View>

                <View>
                    <Text
                        color="gray.700"
                        fontFamily="heading"
                        fontSize="lg"
                    >
                        {title}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={rightIconFunction}
                >
                    <View
                        mr={2}>
                        {rightIcon === "edit" ? <PencilSimpleLine /> : rightIcon === "plus" ? < Plus /> : <View h={4} w={6} />}
                    </View>
                </TouchableOpacity>
            </HStack>
        </SafeAreaView>
    )
}