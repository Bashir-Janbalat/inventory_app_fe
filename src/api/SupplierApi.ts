import axiosInstance from './Api.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {SupplierDTO} from "../types/SupplierDTO.ts";


export const getSuppliers =
    async (): Promise<PagedResponseDTO<SupplierDTO>> => {
        const response = await axiosInstance.get("/suppliers");
        return response.data as PagedResponseDTO<SupplierDTO>;
    };