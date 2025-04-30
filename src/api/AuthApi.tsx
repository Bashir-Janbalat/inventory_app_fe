import {UserDTO} from "../types/UserDTO.ts";
import axios from 'axios';
import {getToken} from "../auth/AuthUtils.ts";
import {getAxiosError} from "../utils/ErrorUtils.ts";

interface LoginResponse {
    accessToken: string;
}

interface SignUpResponse {
    message: string;
    statusCode?: number;
}

const baseURL = import.meta.env.VITE_API_BASE_URL + "/auth";

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post(baseURL + '/login', {username, password});
        return response.data;
    } catch (error) {
        throw new Error(getAxiosError(error));
    }
};

export const signup = async (user: UserDTO): Promise<SignUpResponse> => {
    try {
        const response = await axios.post(baseURL + '/signup', user);
        if (response.status === 201) {
            return {message: "Account created successfully!", statusCode: response.status};
        } else {
            const errorMessage = response.data?.message || "An unexpected error occurred.";
            return {message: errorMessage, statusCode: response.status || 400};
        }
    } catch (error) {
        const errorMessage = getAxiosError(error);
        return {message: errorMessage, statusCode: 400};
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
        console.error("Logout server-side failed:", getAxiosError(error));
        return false;
    }
};

