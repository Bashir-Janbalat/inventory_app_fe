export interface BrandDTO {
    id?: number
    name: string;
}
export interface BrandWithProductCountDTO {
    id?: number
    name: string;
    productCount?: number;
    totalStock?: number;
}