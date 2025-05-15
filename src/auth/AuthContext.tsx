import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {getRolesFromToken, getSubjectFromToken, getToken, isLoggedIn, removeToken} from '../utils/AuthUtils.ts';
import {logoutServerSide} from "../api/AuthApi.ts";

interface AuthContextType {
    authenticated: boolean;
    subject: string | null;
    roles: string[] | null,
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
    roles: null,
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
    const [roles, setRoles] = useState<string[] | null>(null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccessfullyLogout, setSuccessfullyLogout] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setAuthenticated(true);
            setSubject(getSubjectFromToken(token));
            setRoles(getRolesFromToken(token));
        } else {
            setAuthenticated(false);
            setSubject(null);
        }
    }, []);

    const logout = async (expired = false, message = ""): Promise<void> => {
        try {
            const isServerLogouted = expired ? false : await logoutServerSide();

            removeToken();
            setAuthenticated(false);
            setSubject(null);
            setSessionExpired(expired);

            if (message) {
                setMessage(message);
            } else if (expired) {
                setMessage("Your session has expired. Please log in again.");
            } else if (isServerLogouted) {
                setMessage("Successfully logged out.");
            } else {
                setMessage("Logout completed locally.");
            }
            setSuccessfullyLogout(isServerLogouted);
        } catch (error: unknown) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
            setMessage(errorMessage);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                authenticated,
                subject,
                roles,
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


