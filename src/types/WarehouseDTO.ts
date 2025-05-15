export interface WarehouseDTO {
    id?: number;
    name: string;
    address: string;
}

export interface WarehouseStatsDTO {
    id?: number;
    name: string;
    address: string;
    productCount: number;
    totalStockQuantity: number;
}