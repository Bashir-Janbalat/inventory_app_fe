import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {CreateUpdateSupplierDTO, SupplierDTO} from "../types/SupplierDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";


export const getSuppliers =
    async (page?: number, size?: number): Promise<PagedResponseDTO<SupplierDTO>> => {
        try {
            const response = await axiosInstance.get("/suppliers", {
                params: {
                    page,
                    size
                }
            });
            return response.data as PagedResponseDTO<SupplierDTO>;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    };
export const createSupplier = async (supplier: CreateUpdateSupplierDTO): Promise<number> => {
    try {
        const response = await axiosInstance.post('/suppliers', supplier);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}
export const getSupplierById = async (id: number): Promise<SupplierDTO> => {
    try {
        const response = await axiosInstance.get(`/suppliers/${id}`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
export const updateSupplier = async (id: number, supplier: CreateUpdateSupplierDTO): Promise<SupplierDTO> => {
    try {
        const response = await axiosInstance.put(`/suppliers/${id}`, supplier);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
export const getSupplierSize = async (): Promise<number> => {
    try {
        const response = await axiosInstance.get(`/suppliers/supplier-size`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
export const deleteSupplier = async (id: number): Promise<number> => {
    try {
        const response = await axiosInstance.delete(`/suppliers/${id}`);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}