import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";


export const getCategories =
    async (page?: number, size?: number): Promise<PagedResponseDTO<CategoryDTO>> => {
        const response = await axiosInstance.get("/categories", {
            params: {
                page,
                size
            }
        });
        return response.data as PagedResponseDTO<CategoryDTO>;
    }
;