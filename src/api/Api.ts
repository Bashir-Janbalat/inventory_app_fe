import axios from 'axios';
import { getToken, isTokenExpired, removeToken } from '../auth/Auth.ts';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
});

instance.interceptors.request.use((config) => {
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

export default instance;
