import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {SupplierDTO} from "../types/SupplierDTO.ts";


export const getSuppliers =
    async (page?: number, size?: number): Promise<PagedResponseDTO<SupplierDTO>> => {
        const response = await axiosInstance.get("/suppliers", {
            params: {
                page,
                size
            }
        });
        return response.data as PagedResponseDTO<SupplierDTO>;
    };