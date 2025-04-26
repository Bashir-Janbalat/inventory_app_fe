import axios from './Api.ts';

import {ProductDTO} from '../types/ProductDTO';
import {PagedResponse} from "../types/PagedResponse.ts";

const baseURL = import.meta.env.VITE_API_BASE_URL;


export const getProducts =
    async (page: number, size: number, sortBy: string, sortDirection: string, searchBy: string, categoryName: string, brandName: string):
        Promise<PagedResponse<ProductDTO>> => {
        const response = await axios.get(baseURL + "/products", {
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
        return response.data as PagedResponse<ProductDTO>;
    };

export const getProductById = async (id: number): Promise<ProductDTO> => {
    const response = await axios.get(baseURL + `/products/${id}`);
    return response.data;
};
