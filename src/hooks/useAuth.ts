import {useContext} from "react";
import {AuthContext} from '../auth/AuthContext.tsx'


export const useAuth = () => {
    return useContext(AuthContext);
};