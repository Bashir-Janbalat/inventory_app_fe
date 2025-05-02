import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";
import {getAxiosError} from "../utils/ErrorUtils.ts";


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
            const errorMessage = getAxiosError(error);
            throw new Error(errorMessage);
        }
    }
;