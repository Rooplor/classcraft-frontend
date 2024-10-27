import type { HttpResponse } from "../types/HttpResponse";

const useAuth = () => {
    const config = useRuntimeConfig();
    const login = (idToken: string): Promise<HttpResponse> => {
        return $fetch(`${config.public.baseUrl}/api/auth/login`, {
            body: JSON.stringify({ idToken }),
            method: "POST",
        });
    };

    const logout = (): Promise<HttpResponse> => {
        return $fetch(`${config.public.baseUrl}/api/logout`, {
            method: "GET",
        });
    };
    return { login, logout };
};

export default useAuth;
