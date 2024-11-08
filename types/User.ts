import type { IClassroom } from "./Classroom";

export interface IUser {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
    myClassrooms: IClassroom[];
}