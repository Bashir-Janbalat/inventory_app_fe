import axiosInstance from './AxiosInstance.ts';
import {getDetailedApiError} from "../utils/ErrorUtils.ts";
import {DashboardSummaryStatsDTO} from "../types/DashboardSummaryStatsDTO.ts";
import {ProductStatusCountStatsDTO} from "../types/ProductStatusCountStatsDTO.ts";

export const getDashboardSummary =
    async (): Promise<DashboardSummaryStatsDTO> => {
        try {
            const response = await axiosInstance.get("/dashboard/summary");
            return response.data;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    }
export const getProductStatusSummary =
    async (): Promise<ProductStatusCountStatsDTO[]> => {
        try {
            const response = await axiosInstance.get("/dashboard/product-status-summary");
            return response.data;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    }