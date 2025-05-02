import axiosInstance from './AxiosInstance.ts';

import {ProductDTO} from '../types/ProductDTO';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {getAxiosError} from "../utils/ErrorUtils.ts";


export const getProducts =
    async (page: number, size: number, sortBy: string, sortDirection: string,
           searchBy: string, categoryName: string, brandName: string, supplierName: string):
        Promise<PagedResponseDTO<ProductDTO>> => {
        try {
            const response = await axiosInstance.get("/products", {
                params: {
                    page,
                    size,
                    sortDirection,
                    sortBy,
                    searchBy,
                    categoryName,
                    brandName,
                    supplierName
                }
            });
            return response.data as PagedResponseDTO<ProductDTO>;
        } catch (error) {
            const errorMessage = getAxiosError(error);
            throw new Error(errorMessage);
        }
    };

export const getProductById = async (id: number): Promise<ProductDTO> => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = getAxiosError(error);
        throw new Error(errorMessage);
    }
};
