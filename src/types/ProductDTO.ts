interface ProductAttributeDTO {
    attributeName: string;
    attributeValue: string;
}

interface ImageDTO {
    imageUrl: string;
    altText: string;
}

interface stockDTO {
    quantity: number;
    warehouseLocation: string;
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
    images: ImageDTO [];
    productAttributes: ProductAttributeDTO[];
    stock: stockDTO;
}

