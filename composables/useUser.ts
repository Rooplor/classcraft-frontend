import type { ResponseListUser, ResponseUser } from "../types/User";

const useUser = () => {
    const config = useRuntimeConfig();
    // const { data } = useAuth();
    // const accessToken = data.value?.user?.accessToken;

    const getAllUser = (): Promise<ResponseListUser> => {
        return $fetch(`${config.public.baseUrl}/api/user`, {
            params: {
                registrationStatus: false,
            },
            method: "GET",
        });
    };

    const getUserById = (id: string): Promise<ResponseUser> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            method: "GET",
        });
    };
    return { getAllUser, getUserById };
};

export default useUser;
