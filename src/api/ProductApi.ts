import axiosInstance from './AxiosInstance.ts';
import {ProductDTO} from '../types/ProductDTO';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";


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
            throw getDetailedApiError(error);
        }
    };

export const getProductById = async (id: number): Promise<ProductDTO> => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const createProduct = async (product: ProductDTO): Promise<number> => {
    try {
        const response = await axiosInstance.post('/products', product);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}
export const updateProduct = async (id: number, product: ProductDTO): Promise<ProductDTO> => {
    try {
        const response = await axiosInstance.put(`/products/${id}`, product);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const deleteProduct = async (id: number): Promise<number> => {
    try {
        const response = await axiosInstance.delete(`/products/${id}`);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

