import {useCallback, useContext, useState} from 'react';
import AuthContext from "../auth/AuthContext.tsx";
import {TokenInvalidOrExpiredError} from "../errors/TokenInvalidOrExpiredError.ts";
import {getAxiosError} from "../utils/ErrorUtils.ts";

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
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, [fetcher]);

    const handleError = (errorInput: unknown) => {
        if (errorInput instanceof TokenInvalidOrExpiredError) {
            logout(true, errorInput.message);
            return;
        }
        setError(getAxiosError(errorInput));
    };

    return {data, error, loading, fetchData};
}
