export interface StockMovementsDTO {
    id: number,
    reason: string,
    username: string,
    quantity: number,
    movementType: string,
    createdAt: string,
    warehouseName: string,
    productName: string,
    "productId": number,
    "warehouseId": number,
    productDeleted: boolean,
    productNameSnapshot: string,
}