import { Box, Text, Image, IImageProps, Center } from "native-base";

type Props = IImageProps & {
    uri: string;
    active: boolean;
}

export function CarouselPicture({ uri, active, ...rest }: Props) {
    return (
        <Box
            flex={1}
        >{
                active ? <Image
                    source={{ uri }}
                    alt="Carousel picture"
                    flex={1}
                    {...rest}
                />
                    : <Box flex={1}>
                        <Image
                            source={{ uri }}
                            alt="Carousel picture"
                            height="100%"
                            width="100%"
                            position="absolute"
                            resizeMode="stretch"
                        />
                        <Center
                            justifyContent="center"
                            alignItems="center"
                            position="absolute"
                            width="100%"
                            height="100%"
                            backgroundColor="rgba(0, 0, 0, 0.6)" // Cor preta com 50% de opacidade
                            zIndex={1}
                        >
                            <Text
                                color="gray.100"
                                fontFamily="heading"
                                fontSize="sm"
                            >
                                ANÚNCIO DESATIVADO
                            </Text>
                        </Center>
                    </Box>
            }

        </Box>
    )
}