interface ProductAttributeDTO {
    attributeID?: number;
    attributeName: string;
    attributeValue: string;
    isInitial: boolean;
}

interface ImageDTO {
    id?: number;
    imageUrl: string;
    altText: string;
}

interface stockDTO {
    quantity: number;
    warehouse: Warehouse;
}

interface Warehouse {
    id?: number;
    name: string;
    address: string;
}

export interface ProductDTO {
    id?: number;
    name: string;
    sku: string ;
    description?: string;
    price: number;
    categoryID?: number;
    categoryName?: string;
    brandID?: number;
    brandName?: string;
    supplierID?: number;
    supplierName?: string;
    images: ImageDTO [];
    productAttributes: ProductAttributeDTO[];
    stock: stockDTO;
}

