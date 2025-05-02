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