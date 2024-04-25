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

export type product_image_props = {
    id: string;
    path: string;
}

export type payment_method_props = {
    key: "boleto" | "pix" | "cash" | "card" | "deposit";
    name: string;
}

export type productsProps = {
    id?: string;
    name?: string;
    description?: string;
    is_new?: boolean;
    price?: number;
    accept_trade?: boolean;
    user_id?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    product_images?: product_image_props[];
    payment_methods?: payment_method_props[];
    user?: {
        name: string;
        avatar: string;
    };
}