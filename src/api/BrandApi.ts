import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {BrandDTO} from "../types/BrandDTO.ts";

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