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
    id?: number;
    name: string;
    sku: string;
    description?: string;
    price: number;
    categoryID?: number;
    categoryName?: string;
    brandID?: number;
    brandName?: string;
    supplierID?: number;
    supplierName?: string;
    supplierContactEmail?: string;
    images: ImageDTO [];
    productAttributes: ProductAttributeDTO[];
    stock: stockDTO;
}

