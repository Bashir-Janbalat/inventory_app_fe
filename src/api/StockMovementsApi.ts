import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {StockMovementsDTO} from "../types/StockMovementsDTO.ts";
import axiosInstance from "./AxiosInstance.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";


export const getStockMovements =
    async (page?: number, size?: number, sortBy?: string, sortDirection?: string,date?:string,movementType?:string): Promise<PagedResponseDTO<StockMovementsDTO>> => {
        try {
            const response = await axiosInstance.get("/stockMovements", {
                params: {
                    page,
                    size,
                    sortBy,
                    sortDirection,
                    date,
                    movementType
                }
            });
            return response.data as PagedResponseDTO<StockMovementsDTO>;
        } catch (error) {
            throw getDetailedApiError(error);
        }
    }