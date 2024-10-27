import type { IResponse } from "../types/Response";
import type { IListUserResponse, IResponseUser, IUser } from "../types/User";

const useUser = () => {
    const config = useRuntimeConfig();

    const getAllUser = (): Promise<IListUserResponse> => {
        return $fetch(`${config.public.baseUrl}/api/user`, {
            method: "GET",
        });
    };

    const getUserById = (id: string): Promise<IResponseUser> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            method: "GET",
        });
    };

    const updateUser = (id: string, user: IUser): Promise<IResponseUser> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            body: JSON.stringify(user),
            method: "GET",
        });
    };

    const deleteUser = (id: string): Promise<IResponse> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            method: "DELETE",
        });
    };

    const addNewUser = (user: IUser): Promise<IResponseUser> => {
        return $fetch(`${config.public.baseUrl}/api/user`, {
            body: JSON.stringify(user),
            method: "POST",
        });
    };

    return {
        getAllUser,
        getUserById,
        updateUser,
        deleteUser,
        addNewUser,
    };
};

export default useUser;
