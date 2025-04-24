import axios from './api';
import {UserDTO} from "../types/UserDTO.ts";

interface LoginResponse {
    accessToken: string;
}

interface SignUpResponse {
    message: string;
    statusCode?: number;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post(baseURL + '/auth/login', {username, password});
    return response.data;
};

export const signup = async (user: UserDTO): Promise<SignUpResponse> => {
    try {
        const response = await axios.post(baseURL + '/auth/signup', user);
        if (response.status === 201) {
            return {
                message: "Account created successfully!",
                statusCode: response.status,
            };
        } else {
            const errorMessage = response.data?.message || "An unexpected error occurred.";
            return {
                message: errorMessage,
                statusCode: response.status || 400,
            };
        }
    } catch (error: unknown) {
        if ((error as any).response) {
            const axiosError = error as any;
            const errorMessage = axiosError.response?.data?.message || "Signup failed. Please try again.";
            console.error("Signup failed:", errorMessage);
            return {
                message: errorMessage,
                statusCode: axiosError.response?.status || 400,
            };
        } else {
            return {
                message: "Signup failed. Please check your network connection and try again.",
                statusCode: 400,
            };
        }
    }
};