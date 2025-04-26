export interface PagedResponseDTO<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
}