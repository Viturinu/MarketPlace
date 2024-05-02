export function unmaskCurrency(value: string) {
    value = value.replace(/[,.]/g, '');
    return value;
}

export function unmaskPhone(value: string) {
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, "");
    return value;
}