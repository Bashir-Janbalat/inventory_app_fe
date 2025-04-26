import axios from './Api.ts';
import {PagedResponse} from "../types/PagedResponse.ts";
import {BrandDTO} from "../types/BrandDTO.ts";

const baseURL = import.meta.env.VITE_API_BASE_URL;


export const getBrands =
    async (): Promise<PagedResponse<BrandDTO>> => {
        const response = await axios.get(baseURL + "/brands");
        return response.data as PagedResponse<BrandDTO>;
    };