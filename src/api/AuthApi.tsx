import {UserDTO} from "../types/UserDTO.ts";
import axios from 'axios';
import {getToken} from "../auth/AuthUtils.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";

interface LoginResponse {
    accessToken: string;
}

const baseURL = import.meta.env.VITE_API_BASE_URL + "/auth";

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post(baseURL + '/login', {username, password});
        return response.data;
    } catch (error) {
        throw new Error(getDetailedApiError(error).message);
    }
};

export const signup = async (user: UserDTO): Promise<number> => {
    try {
        const response = await axios.post(baseURL + '/signup', user);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const logoutServerSide = async (): Promise<boolean> => {
    try {
        const token = getToken();
        if (!token) {
            console.warn("No token found for logout.");
            return false;
        }
        const response = await axios.post(baseURL + '/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.status === 200;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

