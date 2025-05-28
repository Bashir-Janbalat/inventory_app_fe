import axiosInstance from './AxiosInstance.ts';
import {getDetailedApiError} from "../utils/ErrorUtils.ts";
import {DashboardSummaryStatsDTO} from "../types/DashboardSummaryStatsDTO.ts";
import {ProductStatusCountStatsDTO} from "../types/ProductStatusCountStatsDTO.ts";
import {StockStatusCountStatsDTO} from "../types/StockStatusCountStatsDTO.ts";
import {MonthlyProductCountStatsDTO} from "../types/MonthlyProductCountStatsDTO.ts";

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

export const getStockStatusSummary =
    async (): Promise<StockStatusCountStatsDTO[]> => {
        try {
            const response = await axiosInstance.get("/dashboard/stock-status-summary");
            return response.data;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    }

export const getMonthlyProductStats = async (): Promise<MonthlyProductCountStatsDTO[]> => {
    try {
        const response = await axiosInstance.get('/dashboard/monthly-product-counts');
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
