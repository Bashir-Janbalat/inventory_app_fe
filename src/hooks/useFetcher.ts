import {useCallback, useContext, useState} from 'react';
import AuthContext from "../auth/AuthContext.tsx";
import {DetailedApiError} from "../errors/DetailedApiError.ts";

export function useFetcher<T>(fetcher: () => Promise<T>) {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {logout} = useContext(AuthContext);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetcher();
            setData(response);
        } catch (err) {
            if (err instanceof DetailedApiError) {
                handleError(err as DetailedApiError);
            } else {
                setError("Unexpected error occurred.");
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    }, [fetcher]);

    const handleError = (errorInput: DetailedApiError) => {
        if (errorInput.status === 401) {
            logout(true, errorInput.message);
            return;
        }
        if (errorInput instanceof Error) {
            setError(errorInput.message);
            return;
        }
        setError("Unexpected error occurred.");
    };

    return {data, error, loading, fetchData};
}
