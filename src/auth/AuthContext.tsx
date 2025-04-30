import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {getSubjectFromToken, getToken, isLoggedIn, removeToken} from './AuthUtils.ts';
import {logoutServerSide} from "../api/AuthApi.tsx";

interface AuthContextType {
    authenticated: boolean;
    subject: string | null;
    setAuthenticated: (authenticated: boolean) => void;
    setSubject: (subject: string | null) => void;
    sessionExpired: boolean;
    message: string
    logout: (expired?: boolean, message?: string) => void;
    isSuccessfullyLogout?: boolean
}

interface AuthProviderProps {
    children: ReactNode;
}

const defaultAuthContext: AuthContextType = {
    authenticated: false,
    subject: null,
    setAuthenticated: () => {
    },
    setSubject: () => {
    },
    sessionExpired: false,
    message: "",
    logout: () => {
    },
    isSuccessfullyLogout: false,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [authenticated, setAuthenticated] = useState<boolean>(isLoggedIn());
    const [subject, setSubject] = useState<string | null>(null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccessfullyLogout, setSuccessfullyLogout] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setAuthenticated(true);
            setSubject(getSubjectFromToken(token));
        } else {
            setAuthenticated(false);
            setSubject(null);
        }
    }, []);

    const logout = async (expired = false, message = "") => {
        try {
            const serverLogoutSuccess = await logoutServerSide();
            removeToken();
            setAuthenticated(false);
            setSubject(null);
            setSessionExpired(expired);
            setMessage(message);
            if (!serverLogoutSuccess) {
                console.error("Logout on server failed, but proceeding with local logout.");
                setMessage("Logout was successful locally, but there was an issue logging out on the server.");
            }
            setSuccessfullyLogout(true);
        } catch (error) {
            console.error("Error during logout:", error);
            setMessage("An error occurred while logging out.");
        }
    };


    return (
        <AuthContext.Provider
            value={{
                authenticated,
                subject,
                setAuthenticated,
                setSubject,
                sessionExpired,
                message,
                logout,
                isSuccessfullyLogout
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


