import axios from "axios";
import {ServerErrorResponse} from "../types/ServerErrorResponse.ts";


export function getAxiosError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const {status, statusText, data} = error.response;
            const serverResponse = data as ServerErrorResponse;
            const message = serverResponse.message || statusText || 'Unknown server error';
            const path = serverResponse.path || '';
            return `Error ${status}: ${message} : ${path}`;
        }

        if (error.request) {
            return 'Server not reachable. Please try again later or check your internet connection.';
        }

        return error.request.message || 'Unexpected error occurred.';
    }
    return "An unexpected error occurred. Please check your network connection and try again.";
}