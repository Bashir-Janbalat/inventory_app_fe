export interface CategoryDTO {
    id?: number
    name: string;
}

export interface CategoryStatsDTO {
    id?: number
    name: string;
    totalBrands: number;
    totalProducts: number;
    totalStockQuantity: number;
}