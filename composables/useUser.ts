import type { IResponse } from "../types/Response";
import type { IUser } from "../types/User";

const useUser = () => {
    const config = useRuntimeConfig();

    const getAllUser = (): Promise<IResponse<IUser>> => {
        return $fetch(`${config.public.baseUrl}/api/user`, {
            method: "GET",
        });
    };

    const getUserById = (id: string): Promise<IResponse<IUser>> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            method: "GET",
        });
    };

    const updateUser = (id: string, user: IUser): Promise<IResponse<IUser>> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            body: JSON.stringify(user),
            method: "GET",
        });
    };

    const deleteUser = (id: string): Promise<IResponse<string>> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            method: "DELETE",
        });
    };

    const addNewUser = (user: IUser): Promise<IResponse<IUser>> => {
        return $fetch(`${config.public.baseUrl}/api/user`, {
            body: JSON.stringify(user),
            method: "POST",
        });
    };

    const getUserProfile = (): Promise<IResponse<IUser>> => {
        return $fetch(`${config.public.baseUrl}/api/user/profile`, {
            method: "GET",
        });
    };
    return {
        getAllUser,
        getUserById,
        updateUser,
        deleteUser,
        addNewUser,
        getUserProfile,
    };
};

export default useUser;
