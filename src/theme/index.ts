import { extendTheme } from 'native-base';

export const THEME = extendTheme({
    colors: {
        red: {
            100: '#EE7979'
        },
        gray: {
            700: '#121214',
            600: '#3E3A40',
            500: '#5F5B62',
            400: '#9F9BA1',
            300: '#D9D8DA',
            200: '#EDECEE',
            100: '#F7F7F8'
        },
        blue: {
            100: '#647AC7',
            200: '#364D9D'
        }
    },
    fonts: {
        heading: 'Karla_700Bold',
        body: 'Karla_400Regular',
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24,
    },
    sizes: {
        11: 43,
        14: 56,
        27: 109,
        33: 148
    }
})