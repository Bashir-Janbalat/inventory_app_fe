import axiosInstance from "./AxiosInstance.ts";
import {PurchaseDTO, PurchaseProductDTO} from "../types/PurchaseDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";

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