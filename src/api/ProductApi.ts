import axiosInstance from './Api.ts';

import {ProductDTO} from '../types/ProductDTO';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";


export const getProducts =
    async (page: number, size: number, sortBy: string, sortDirection: string, searchBy: string, categoryName: string, brandName: string):
        Promise<PagedResponseDTO<ProductDTO>> => {
        const response = await axiosInstance.get("/products", {
            params: {
                page,
                size,
                sortDirection,
                sortBy,
                searchBy,
                categoryName,
                brandName
            }
        });
        return response.data as PagedResponseDTO<ProductDTO>;
    };

export const getProductById = async (id: number): Promise<ProductDTO> => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
};
