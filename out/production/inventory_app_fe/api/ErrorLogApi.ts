import axiosInstance from './AxiosInstance.ts';
import {ErrorLogDTO} from "../types/ErrorLogDTO.ts";
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";

export interface ErrorLogFilters {
    page?: number;
    size?: number;
    resolved?: boolean;
    status?: number;
    startDate?: string;
    endDate?: string;
    errorType?: string;
    pathContains?: string;
    messageContains?: string;
}

export const fetchLogs = async (filters: ErrorLogFilters = {}): Promise<PagedResponseDTO<ErrorLogDTO>> => {
    try {
        const params: ErrorLogFilters = {};

        if (filters.page !== undefined) params.page = filters.page;
        if (filters.size !== undefined) params.size = filters.size;
        if (filters.resolved !== undefined) params.resolved = filters.resolved;
        if (filters.status !== undefined) params.status = filters.status;
        if (filters.startDate) params.startDate = filters.startDate;
        if (filters.endDate) params.endDate = filters.endDate;
        if (filters.errorType) params.errorType = filters.errorType;
        if (filters.pathContains) params.pathContains = filters.pathContains;
        if (filters.messageContains) params.messageContains = filters.messageContains;

        const response = await axiosInstance.get("/dev/logs", {params});
        return response.data as PagedResponseDTO<ErrorLogDTO>;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
export const markAsResolved = async (id: number): Promise<number> => {
    try {
        const response = await axiosInstance.put(`/dev/logs/${id}/resolve`);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}