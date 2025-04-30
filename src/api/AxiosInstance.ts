import axios from 'axios';
import {getToken, isTokenExpired, removeToken} from '../auth/AuthUtils.ts';
import {TokenExpiredError} from "../errors/TokenExpiredError.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        if (isTokenExpired(token)) {
            removeToken();
            return Promise.reject(new TokenExpiredError());
        }
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
