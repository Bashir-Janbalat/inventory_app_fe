import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {BrandDTO} from "../types/BrandDTO.ts";

export const getBrands =
    async (): Promise<PagedResponseDTO<BrandDTO>> => {
        const response = await axiosInstance.get("/brands");
        return response.data as PagedResponseDTO<BrandDTO>;
    };