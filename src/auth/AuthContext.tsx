import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {getSubjectFromToken, getToken, isLoggedIn, removeToken} from './AuthUtils.ts';

interface AuthContextType {
    authenticated: boolean;
    subject: string | null;
    setAuthenticated: (authenticated: boolean) => void;
    setSubject: (subject: string | null) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [authenticated, setAuthenticated] = useState<boolean>(isLoggedIn());
    const [subject, setSubject] = useState<string | null>(null);

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

    const logout = () => {
        removeToken();
        setAuthenticated(false);
        setSubject(null);
    };

    return (
        <AuthContext.Provider value={{authenticated, subject, setAuthenticated, setSubject, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


