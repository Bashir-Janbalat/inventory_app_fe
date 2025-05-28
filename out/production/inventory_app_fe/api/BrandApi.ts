import axiosInstance from './AxiosInstance.ts';
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {BrandDTO, BrandStatsDTO} from "../types/BrandDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";

export const getBrands =
    async (page?: number, size?: number): Promise<PagedResponseDTO<BrandDTO>> => {
        try {
            const response = await axiosInstance.get("/brands", {
                params: {
                    page,
                    size
                }
            });
            return response.data as PagedResponseDTO<BrandDTO>;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    }

export const createBrand = async (brand: BrandDTO): Promise<number> => {
    try {
        const response = await axiosInstance.post('/brands', brand);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}
export const getBrandById = async (id: number): Promise<BrandDTO> => {
    try {
        const response = await axiosInstance.get(`/brands/${id}`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
export const updateBrand = async (id: number, brandDto: BrandDTO): Promise<BrandDTO> => {
    try {
        const response = await axiosInstance.put(`/brands/${id}`, brandDto);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
export const getBrandSize = async (): Promise<number> => {
    try {
        const response = await axiosInstance.get(`/brands/brand-size`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const deleteBrand = async (id: number): Promise<number> => {
    try {
        const response = await axiosInstance.delete(`/brands/${id}`);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

export const getBrandsWithStats =
    async (page?: number, size?: number): Promise<PagedResponseDTO<BrandStatsDTO>> => {
        try {
            const response = await axiosInstance.get("/dashboard/brand-stats", {
                params: {
                    page,
                    size
                }
            });
            return response.data as PagedResponseDTO<BrandStatsDTO>;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    }