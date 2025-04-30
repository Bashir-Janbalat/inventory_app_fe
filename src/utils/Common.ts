export async function withLoading<T>(
    setLoading: (loading: boolean) => void,
    fn: () => Promise<T>,
    onError?: (error: unknown) => void): Promise<T | undefined> {
    setLoading(true);
    try {
        return await fn();
    } catch (error) {
        if (onError) {
            onError(error);
        } else {
            console.error('Unhandled error:', error);
        }
        return undefined;
    } finally {
        setLoading(false);
    }
}