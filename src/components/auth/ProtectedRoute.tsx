import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {authenticated, sessionExpired, message, isSuccessfullyLogout} = useAuth();

    if (!authenticated) {
        let state: { error?: string; success?: string } | undefined = undefined;
        if (sessionExpired && message) {
            state = {error: message};
        } else if (isSuccessfullyLogout && message) {
            state = {success: message};
        }

        return <Navigate to="/login" replace state={state}/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
