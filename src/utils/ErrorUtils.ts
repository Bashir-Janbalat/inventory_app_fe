import {AxiosError} from "axios";

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return 'An unknown error has occurred.';
}

interface ErrorResponseData {
    message?: string;
}

export function getAxiosErrorMessage(error: AxiosError): string {
    if (error.response) {
        const status = error.response.status;
        let message = 'Unknown error from server';

        const data = error.response.data as ErrorResponseData;

        if (data && data.message) {
            message = data.message;
        } else if (error.response.statusText) {
            message = error.response.statusText;
        }
        return `Error ${status}: ${message}`;
    } else if (error.request) {
        return 'Network error. Please check your connection.';
    } else {
        return error.message;
    }
}