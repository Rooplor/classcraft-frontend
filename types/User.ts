import type { IHttpResponse } from "./HttpResponse";

export interface User {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
}

export interface IListUserResponse extends IHttpResponse {
    result: User[];
}

export interface IResponseUser {
    success: boolean;
    result: User;
    error: string;
}
