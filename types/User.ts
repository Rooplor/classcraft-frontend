import type { HttpResponse } from "./HttpResponse";

interface User {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
}

interface ResponseListUser extends HttpResponse {
    result: User[];
}

interface ResponseUser {
    success: boolean;
    result: User;
    error: string;
}

export type { User, ResponseListUser, ResponseUser };
