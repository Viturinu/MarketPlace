export type photoFileProps = {
    id: string;
    name: string;
    uri: string;
    type: string;
}

export type productUploadProps = {
    images: photoFileProps[];
    name: string;
    description: string;
    is_new: string;
    price: string;
    accept_trade: boolean;
    payment_methods: string[];
}