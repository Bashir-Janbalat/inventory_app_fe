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
    PENDING,
    COMPLETED,
    CANCELLED
}

export interface PurchaseItemDTO {
    id?: number;
    productId: number | string;
    productName?: string;
    quantity: number;
    unitPrice: number;
}

export interface PurchaseProductDTO {
    productId: number;
    productName: string;
    sku: string;
    unitPrice: number;
}