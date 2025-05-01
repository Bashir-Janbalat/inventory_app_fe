import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {BrandDTO} from "../types/BrandDTO.ts";
import {getAxiosError} from "../utils/ErrorUtils.ts";
import {ApiResponse} from "../types/ApiResponse.ts";

export const getBrands =
    async (page?: number, size?: number): Promise<PagedResponseDTO<BrandDTO>> => {
        const response = await axiosInstance.get("/brands", {
            params: {
                page,
                size
            }
        });
        return response.data as PagedResponseDTO<BrandDTO>;
    };
export const createBrand = async (brand: BrandDTO): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/brands', brand);
        if (response.status === 201) {
            return {message: "Brand created successfully!", statusCode: response.status};
        } else {
            const errorMessage = response.data?.message || "An unexpected error occurred.";
            return {message: errorMessage, statusCode: response.status || 400};
        }
    } catch (error) {
        const errorMessage = getAxiosError(error);
        return {message: errorMessage, statusCode: 400};
    }
}