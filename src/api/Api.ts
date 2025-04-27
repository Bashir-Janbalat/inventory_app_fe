import axios from 'axios';
import {getToken, isTokenExpired, removeToken} from '../auth/AuthUtils.ts';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        if (isTokenExpired(token)) {
            removeToken();
            window.location.href = "/login";
            return Promise.reject("Token expired");
        }
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
