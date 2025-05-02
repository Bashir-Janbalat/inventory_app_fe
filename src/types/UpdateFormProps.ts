
export interface UpdateFormProps<T> {
    id: number;
    fetcher: () => Promise<T>;
    updater: (data: T) => Promise<void>;
    redirectPath: string;
}