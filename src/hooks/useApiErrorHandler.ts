import {useContext, useState} from 'react';
import axios from 'axios';
import {getAxiosErrorMessage} from "../utils/ErrorUtils.ts";
import {TokenInvalidOrExpiredError} from "../errors/TokenInvalidOrExpiredError.ts";
import AuthContext from "../auth/AuthContext.tsx";

export function useApiErrorHandler() {
    const [error, setError] = useState<string | null>(null);
    const {logout} = useContext(AuthContext);

    const handleError = (errorInput: unknown) => {
        if (errorInput instanceof TokenInvalidOrExpiredError) {
            logout();
            return;
        }
        if (axios.isAxiosError(errorInput)) {
            setError(getAxiosErrorMessage(errorInput));
            return;
        }
        setError("An unexpected error has occurred.");
    };

    const resetError = () => {
        setError(null);
    };

    return {error, handleError, resetError};
}
