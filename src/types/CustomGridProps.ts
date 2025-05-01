export interface CustomGridProps<T> {
    items: T[];
    totalPages: number;
    page: number;
    setPage: (value: number) => void;
}
