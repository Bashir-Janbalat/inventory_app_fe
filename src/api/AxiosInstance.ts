import axios from 'axios';
import {getToken, isTokenExpired, removeToken} from '../auth/AuthUtils.ts';
import {TokenInvalidOrExpiredError} from "../errors/TokenInvalidOrExpiredError.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

interface ErrorResponseData {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            if (isTokenExpired(token)) {
                removeToken();
                return Promise.reject(new TokenInvalidOrExpiredError("Your session has expired. Please log in again."));
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                const message = (error.response.data as ErrorResponseData)?.message;
                if (message && message.includes('Token blacklisted')) {
                    removeToken();
                    return Promise.reject(new TokenInvalidOrExpiredError('Your session is no longer valid. Please log in again'));
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
