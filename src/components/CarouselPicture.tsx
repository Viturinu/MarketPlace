import { Box, Image, IImageProps } from "native-base";

type Props = IImageProps & {
    uri: string;
}

export function CarouselPicture({ uri, ...rest }: Props) {
    return (
        <Box
            flex={1}
        >
            <Image
                source={{ uri }}
                alt="Carousel picture"
                flex={1}
                {...rest}
            />
        </Box>
    )
}