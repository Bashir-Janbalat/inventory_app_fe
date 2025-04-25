import axios from './api';

import {ProductDTO} from '../types/ProductDTO';

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface ProductResponse {
    content: ProductDTO[];
    totalPages: number;
    totalElements: number;
}

export const getProducts =async (page: number, size: number): Promise<ProductResponse> => {
    const response = await axios.get(baseURL + "/products", {
        params: {
            page,
            size
        }
        });
    return  response.data as ProductResponse;
};

export const getProductById = async (id: number): Promise<ProductDTO> => {
    const response = await axios.get(baseURL + `/products/${id}`);
    return response.data;
};
