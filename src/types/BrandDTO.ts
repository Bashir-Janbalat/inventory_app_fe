export interface BrandDTO {
    id?: number
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface BrandStatsDTO {
    id: number
    name: string;
    productCount?: number;
    totalStock?: number;
}