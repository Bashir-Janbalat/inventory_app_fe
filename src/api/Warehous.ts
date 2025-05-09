import axiosInstance from './AxiosInstance.ts';
import {WarehouseDTO} from "../types/ProductDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";


export const getWarehouses = async (): Promise<WarehouseDTO[]> => {
    try {
        return await axiosInstance.get('/warehouses').then(response => response.data);
    } catch (error) {
        throw getDetailedApiError(error);
    }
}