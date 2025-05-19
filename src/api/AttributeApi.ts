import axiosInstance from './AxiosInstance.ts';
import {AttributeDTO} from "../types/AttributeDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";


export const getAttributes = async (): Promise<AttributeDTO[]> => {
    try {
        const response = await axiosInstance.get(`/attributes`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}