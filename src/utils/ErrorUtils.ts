import {AxiosError} from "axios";

interface ErrorResponseData {
    message?: string;
}

export function getAxiosErrorMessage(error: AxiosError): string {
    if (error.response) {
        const {status, statusText, data} = error.response;

        if (status === 401) {
            return 'Unauthorized access. Please login again.';
        }
        const errorData = data as ErrorResponseData;

        const serverMessage = errorData?.message?.trim();
        const fallbackMessage = statusText || 'Unknown server error';

        const finalMessage = serverMessage || fallbackMessage;

        return `Error ${status}: ${finalMessage}`;
    }

    if (error.request) {
        return 'Server not reachable. Please try again later or check your internet connection.';
    }
    return error.message || 'Unexpected error occurred.';
}