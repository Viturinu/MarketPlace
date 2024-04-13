export function unmaskCurrency(value: string) {
    value = value.replace(/[,.]/g, '');
    return value;
}