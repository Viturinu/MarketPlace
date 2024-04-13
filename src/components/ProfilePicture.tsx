import { Image, IImageProps } from "native-base"
import { ImageSourcePropType } from "react-native";

type Props = IImageProps & {
    uri: string;
    size: number;
}

export function ProfilePicture({ uri, size, borderColor, ...rest }: Props) {
    return (
        <Image
            source={{ uri: uri }}
            alt="Imagem de profile"
            size={size}
            rounded={9999}
            borderWidth={1}
            borderColor={borderColor}
            {...rest}
        />
    )
}