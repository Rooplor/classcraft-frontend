interface User {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
}

interface ResponseListUser {
    success: boolean;
    result: User[];
    error: string;
}

interface ResponseUser {
    success: boolean;
    result: User;
    error: string;
}


export type { User, ResponseListUser, ResponseUser };
