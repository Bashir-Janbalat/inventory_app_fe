import {useState} from 'react';
import axios from 'axios';
import {getAxiosErrorMessage} from "../utils/ErrorUtils.ts";
import {TokenExpiredError} from "../errors/TokenExpiredError.ts";

export function useApiErrorHandler() {
    const [error, setError] = useState<string | null>(null);
    const [sessionExpired, setSessionExpired] = useState<boolean>(false);

    const handleError = (errorInput: unknown) => {
        if (errorInput instanceof TokenExpiredError) {
            setError("Session expired. Please login again.");
            setSessionExpired(true);
            return;
        }
        if (axios.isAxiosError(errorInput)) {
            setError(getAxiosErrorMessage(errorInput));
        }
    };

    const resetError = () => {
        setError(null);
    };

    return { error, sessionExpired, handleError, resetError };
}
