import {jwtDecode, JwtPayload} from "jwt-decode";

const TOKEN_KEY = 'access_token';

export const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};
export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp ? decoded.exp < currentTime : true;
    } catch (error) {
        console.error(error);
        return true;
    }
};

export const isLoggedIn = (): boolean => {
    const token = getToken();
    return !!token && !isTokenExpired(token);
};
export const getUsernameFromToken = (): string | null => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.sub || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};
