import {useCallback, useState} from "react";

export function useLoading() {
    const [loading, setLoading] = useState(false);

    const withLoading = useCallback(async <T>(fn: () => Promise<T>, onError?: (error: unknown) => void): Promise<T | undefined> => {
        setLoading(true);
        try {
            return await fn();
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                console.error(error);
            }
            return undefined;
        } finally {
            setLoading(false);
        }
    }, []);

    return {loading, withLoading};
}
