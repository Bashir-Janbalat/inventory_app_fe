import {jwtDecode} from "jwt-decode";

const TOKEN_KEY = 'access_token';


interface JwtPayload {
    sub: string;
    roles: { authority: string }[];
    iat: number;
    exp: number;
}

export const saveToken = (token: string) => {
    sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
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

export const getSubjectFromToken = (token: string): string | null => {
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.sub || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const getRolesFromToken = (token: string): string[] | null => {
    if (!token) return null;
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.roles?.map(role => role.authority) || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}
