interface ProductAttributeDTO {
    name: string;
    value: string;
}

export interface ProductDTO {
    id: number;
    name: string;
    sku: string;
    description?: string;
    price: number;
    categoryName?: string;
    brandName?: string;
    supplierName?: string;
    supplierContactEmail?: string;
    images: { url: string }[];
    productAttributes: ProductAttributeDTO[];
}

