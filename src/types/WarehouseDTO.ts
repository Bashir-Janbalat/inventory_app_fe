export interface WarehouseDTO {
    id?: number;
    name: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WarehouseStatsDTO {
    id?: number;
    name: string;
    address: string;
    productCount: number;
    totalStockQuantity: number;
}