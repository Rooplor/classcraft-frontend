import type { IResponse } from "./Response";

export interface IUser {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
}

export interface IListUserResponse extends IResponse {
    result: IUser[];
}

export interface IResponseUser {
    success: boolean;
    result: IUser;
    error: string;
}
