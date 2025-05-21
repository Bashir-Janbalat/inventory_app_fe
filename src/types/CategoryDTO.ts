export interface CategoryDTO {
    id?: number
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CategoryStatsDTO {
    id: number
    name: string;
    totalBrands: number;
    totalProducts: number;
    totalStockQuantity: number;
}