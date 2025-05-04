import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";


export const getCategories =
    async (page?: number, size?: number): Promise<PagedResponseDTO<CategoryDTO>> => {
        try {
            const response = await axiosInstance.get("/categories", {
                params: {
                    page,
                    size
                }
            });
            return response.data as PagedResponseDTO<CategoryDTO>;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    };
export const createCategory = async (category: CategoryDTO): Promise<number> => {
    try {
        const response = await axiosInstance.post('/categories', category);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}
export const getCategoryById = async (id: number): Promise<CategoryDTO> => {
    try {
        const response = await axiosInstance.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
export const updateCategory = async (id: number, categoryDto: CategoryDTO): Promise<CategoryDTO> => {
    try {
        const response = await axiosInstance.put(`/categories/${id}`, categoryDto);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
export const getCategorySize = async (): Promise<number> => {
    try {
        const response = await axiosInstance.get(`/categories/category-size`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};