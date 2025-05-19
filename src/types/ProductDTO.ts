import {WarehouseDTO} from "./WarehouseDTO.ts";

export interface ProductAttributeDTO {
    attributeID?: number;
    attributeName: string;
    attributeValue: string;
}

export interface ImageDTO {
    id?: number;
    imageUrl: string;
    altText: string;
}

export interface StockDTO {
    quantity: number;
    warehouse: WarehouseDTO;
    movementType?: string;
    movementQuantity?: number;
    destinationWarehouseId?: number;
}

export interface ProductDTO {
    id?: number;
    name: string;
    sku: string ;
    description?: string;
    costPrice: number;
    categoryID?: number;
    categoryName?: string;
    brandID?: number;
    brandName?: string;
    supplierID?: number;
    supplierName?: string;
    images: ImageDTO [];
    productAttributes: ProductAttributeDTO[];
    stocks: StockDTO[];
}

