import axios from './Api.ts';
import {PagedResponse} from "../types/PagedResponse.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const getCategories =
    async (): Promise<PagedResponse<CategoryDTO>> => {
        const response = await axios.get(baseURL + "/categories");
        return response.data as PagedResponse<CategoryDTO>;
    };