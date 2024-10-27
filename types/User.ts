import type { IHttpResponse } from "./HttpResponse";

export interface IUser {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
}

export interface IListUserResponse extends IHttpResponse {
    result: IUser[];
}

export interface IResponseUser {
    success: boolean;
    result: IUser;
    error: string;
}
