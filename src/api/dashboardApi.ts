import axiosInstance from './AxiosInstance.ts';
import {getDetailedApiError} from "../utils/ErrorUtils.ts";
import {DashboardSummaryStatsDTO} from "../types/DashboardSummaryStatsDTO.ts";

export const getDashboardSummary =
    async (): Promise<DashboardSummaryStatsDTO> => {
        try {
            const response = await axiosInstance.get("/dashboard/summary");
            return response.data;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    }