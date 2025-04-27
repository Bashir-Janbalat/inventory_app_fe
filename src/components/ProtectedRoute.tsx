import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../auth/UseAuth.ts";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const {authenticated } = useAuth();

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
