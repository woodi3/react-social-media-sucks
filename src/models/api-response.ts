export interface APIResponse<T> {
    success: boolean;
    message: string;
    item: T;
    exception: any;
    token: string;
}