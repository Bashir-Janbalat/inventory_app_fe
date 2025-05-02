import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {SupplierDTO} from "../types/SupplierDTO.ts";
import {getAxiosError} from "../utils/ErrorUtils.ts";


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
            const errorMessage = getAxiosError(error);
            throw new Error(errorMessage);
        }
    };
export const createSupplier = async (supplier: SupplierDTO): Promise<number> => {
    try {
        const response = await axiosInstance.post('/suppliers', supplier);
        return response.status;
    } catch (error) {
        const errorMessage = getAxiosError(error);
        throw new Error(errorMessage);
    }
}
export const getSupplierById = async (id: number): Promise<SupplierDTO> => {
    try {
        const response = await axiosInstance.get(`/suppliers/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = getAxiosError(error);
        throw new Error(errorMessage);
    }
};
export const updateSupplier = async (id: number, supplier: SupplierDTO): Promise<SupplierDTO> => {
    try {
        const response = await axiosInstance.put(`/suppliers/${id}`, supplier);
        return response.data;
    } catch (error) {
        const errorMessage = getAxiosError(error);
        throw new Error(errorMessage);
    }
};