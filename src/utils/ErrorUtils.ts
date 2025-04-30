import axios, {AxiosError} from "axios";

interface ErrorResponseData {
    message: string;
    statusCode?: number;
}

export function getAxiosError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseData>;
        if (axiosError.response) {
            const {status, statusText, data} = axiosError.response;
            if (status === 401) {
                return 'Unauthorized access. Please login again.';
            }
            const errorData = data as ErrorResponseData;
            const serverMessage = errorData?.message?.trim();
            const fallbackMessage = statusText || 'Unknown server error';
            return `Error ${status}: ${serverMessage || fallbackMessage}`;
        }

        if (axiosError.request) {
            return 'Server not reachable. Please try again later or check your internet connection.';
        }

        return axiosError.message || 'Unexpected error occurred.';
    }
    return "An unexpected error occurred. Please check your network connection and try again.";
}