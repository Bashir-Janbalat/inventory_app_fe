export interface SupplierDTO {
    id: number
    name: string;
    contactEmail: string;
    phone: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateUpdateSupplierDTO {
    id?: number
    name: string;
    contactEmail: string;
    phone: string;
    address: string;
}