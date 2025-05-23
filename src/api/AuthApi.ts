import {UserDTO} from "../types/UserDTO.ts";
import axiosInstance from './AxiosInstance.ts';
import {getToken} from "../utils/AuthUtils.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";

interface LoginResponse {
    accessToken: string;
}


export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post('/auth/login', {username, password});
        return response.data;
    } catch (error) {
        throw new Error(getDetailedApiError(error).message);
    }
};

export const signup = async (user: UserDTO): Promise<number> => {
    try {
        const response = await axiosInstance.post('/auth/signup', user);
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
        const response = await axiosInstance.post('/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.status === 200;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const sendResetLink = async (email: string): Promise<string> => {
    try {
        const encodedEmail = encodeURIComponent(email);
        const response = await axiosInstance.post(`/auth/send-reset-link?email=${encodedEmail}`);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

interface PasswordResetRequest {
    newPassword: string;
    token: string;
}

export const resetPassword = async (request: PasswordResetRequest): Promise<string> => {
    try {
        const response = await axiosInstance.post(`/auth/reset-password`, request);
        console.log(response);
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

