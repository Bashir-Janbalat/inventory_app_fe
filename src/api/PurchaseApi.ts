import axiosInstance from "./AxiosInstance.ts";
import {PurchaseDTO, PurchaseProductDTO, PurchaseStatus} from "../types/PurchaseDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";

type QueryParams = {
    page: number,
    size: number,
}

export const getProductsForSupplier = async (supplierId: number): Promise<PurchaseProductDTO[]> => {
    try {
        const response = await axiosInstance.get("/purchases/products?supplierId=" + supplierId);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const createPurchase = async (purchaseDTO: PurchaseDTO): Promise<number> => {
    try {
        const response = await axiosInstance.post("/purchases", purchaseDTO);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

export const getPurchases = async (params: QueryParams): Promise<PagedResponseDTO<PurchaseDTO>> => {
    try {
        const response = await axiosInstance.get("/purchases", {params});
        return response.data as PagedResponseDTO<PurchaseDTO>;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

export const updatePurchaseStatus = async (purchaseId: number, status: PurchaseStatus): Promise<number> => {
    try {
        const response = await axiosInstance.put(`/purchases/${purchaseId}/status?status=${status}` );
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}