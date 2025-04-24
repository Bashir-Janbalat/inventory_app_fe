import axios from './api';

import {ProductDTO} from '../types/ProductDTO';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const getProducts = async (): Promise<ProductDTO[]> => {
    const response = await axios.get(baseURL + `/products`);
    return response.data;
};

export const getProductById = async (id: number): Promise<ProductDTO> => {
    const response = await axios.get(baseURL + `/products/${id}`);
    return response.data;
};
