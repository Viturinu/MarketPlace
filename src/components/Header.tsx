import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, PencilSimpleLine, Plus } from "phosphor-react-native"
import { View, Text, HStack } from "native-base";
import { TouchableOpacity } from "react-native";

type Props = {
    title?: string;
    rightIcon?: "plus" | "edit";
    backIcon?: boolean;
}

export function Header({ title, rightIcon, backIcon = false }: Props) {

    return (
        <SafeAreaView>
            <HStack
                justifyContent="space-between"
                alignItems="center"
                paddingX={4}
                mt={5}
            >
                <TouchableOpacity>
                    <View>
                        {backIcon ? <ArrowLeft /> : <View h={4} w={6} />}
                    </View>
                </TouchableOpacity>
                <View>
                    <Text
                        color="gray.700"
                        fontFamily="heading"
                        fontSize="lg"
                    >
                        {title}
                    </Text>
                </View>
                <View
                    mr={2}>
                    {rightIcon === "edit" ? <PencilSimpleLine /> : rightIcon === "plus" ? < Plus /> : <View h={4} w={6} />}
                </View>
            </HStack>
        </SafeAreaView>
    )
}