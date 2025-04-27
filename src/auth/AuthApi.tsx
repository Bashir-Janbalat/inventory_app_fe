import {UserDTO} from "../types/UserDTO.ts";
import axios, {AxiosError} from 'axios';

interface LoginResponse {
    accessToken: string;
}

interface SignUpResponse {
    message: string;
    statusCode?: number;
}

interface ErrorResponse {
    message: string;
    statusCode?: number;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post(baseURL + '/auth/login', {username, password});
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage = axiosError.response?.data?.message || "Login failed. Please check your credentials..";
            throw new Error(errorMessage);
        } else {
            throw new Error("Login failed. Please check your network connection and try again.");
        }
    }
};
const handleAxiosError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return axiosError.response?.data?.message || "An unexpected error occurred.";
    } else {
        console.error("Error:", error);
        return "An unexpected error occurred. Please check your network connection and try again.";
    }
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
                message: errorMessage, // Fehlernachricht der API
                statusCode: response.status || 400, // Default-Statuscode
            };
        }
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        return {
            message: errorMessage, // Fehlernachricht
            statusCode: 400, // Statuscode im Fehlerfall
        };
    }
};
