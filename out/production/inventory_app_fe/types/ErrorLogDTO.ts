export interface ErrorLogDTO {
    id: number;
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
    stackTrace: string;
    resolved: boolean;
    resolvedAt?: string | null;
}