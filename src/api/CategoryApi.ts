import axiosInstance from './Api.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";


export const getCategories =
    async (): Promise<PagedResponseDTO<CategoryDTO>> => {
        const response = await axiosInstance.get("/categories");
        return response.data as PagedResponseDTO<CategoryDTO>;
    };