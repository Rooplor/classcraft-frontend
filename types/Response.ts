export interface IResponse<T> {
    success: boolean;
    result: T;
    error: string;
}
