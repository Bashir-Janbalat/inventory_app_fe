import axiosInstance from './AxiosInstance.ts';
import {getDetailedApiError} from "../utils/ErrorUtils.ts";
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {WarehouseDTO, WarehouseStatsDTO} from "../types/WarehouseDTO.ts";


export const getWarehouses = async (): Promise<WarehouseDTO[]> => {
    try {
        return await axiosInstance.get('/warehouses').then(response => response.data);
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

export const getPagedWarehouses =
    async (page?: number, size?: number): Promise<PagedResponseDTO<WarehouseDTO>> => {
        try {
            const response = await axiosInstance.get("/warehouses", {
                params: {
                    page,
                    size
                }
            });
            return response.data as PagedResponseDTO<WarehouseDTO>;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    }
export const deleteWarehouse = async (id: number): Promise<number> => {
    try {
        const response = await axiosInstance.delete(`/warehouses/${id}`);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

export const createWarehouse = async (warehous: WarehouseDTO): Promise<number> => {
    try {
        const response = await axiosInstance.post('/warehouses', warehous);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

export const updateWarehouse = async (id: number, dto: WarehouseDTO): Promise<WarehouseDTO> => {
    try {
        const response = await axiosInstance.put(`/warehouses/${id}`, dto);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const getWarehouseById = async (id: number): Promise<WarehouseDTO> => {
    try {
        const response = await axiosInstance.get(`/warehouses/${id}`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
export const getWarehousesWithStats =
    async (page?: number, size?: number): Promise<PagedResponseDTO<WarehouseStatsDTO>> => {
        try {
            const response = await axiosInstance.get("/dashboard/warehouse-stats", {
                params: {
                    page,
                    size
                }
            });
            return response.data as PagedResponseDTO<WarehouseStatsDTO>;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    }