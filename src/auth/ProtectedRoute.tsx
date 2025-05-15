import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {authenticated, sessionExpired, message, isSuccessfullyLogout} = useAuth();
    const pleaseLogInAgain = "Your session has expired. Please log in again.";
    const successMessage = "You have been successfully logged out";
    let state: { error?: string; success?: string } | undefined = undefined;
    if (!authenticated) {
        if (sessionExpired) {
            state = {error: message || pleaseLogInAgain};
        }
        if (isSuccessfullyLogout) {
            state = {success: message || successMessage};
        }

        return <Navigate to="/login" replace state={state}/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
