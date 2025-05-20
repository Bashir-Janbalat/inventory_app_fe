export interface PurchaseDTO {
    id?: number
    createdAt?: Date;
    updatedAt?: Date;
    supplierId: number;
    supplierName?: string;
    status?: PurchaseStatus;
    items: PurchaseItemDTO[];
}

export enum PurchaseStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

export interface PurchaseItemDTO {
    id?: number;
    productId: number | string;
    productName?: string;
    sku?: string;
    quantity: number;
    unitPrice: number;
    warehouseId: number | string;
    warehouseName?: string;
}

export interface PurchaseProductDTO {
    productId: number;
    productName: string;
    sku: string;
    unitPrice: number;
}