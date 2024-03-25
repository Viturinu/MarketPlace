import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, PencilSimpleLine, Plus } from "phosphor-react-native"
import { View, Text, HStack } from "native-base";

type Props = {
    title?: string;
    rightIcon?: "plus" | "edit";
    backIcon?: boolean;
}

export function Header({ title, rightIcon, backIcon = false }: Props) {

    return (
        <SafeAreaView>
            <HStack
                style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: 5
                }}
            >
                <View>
                    {backIcon ? <ArrowLeft /> : <View h={4} w={6} />}
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
                <View>
                    {rightIcon === "edit" ? <PencilSimpleLine /> : rightIcon === "plus" ? < Plus /> : <View h={4} w={6} />}
                </View>
            </HStack>
        </SafeAreaView>
    )
}