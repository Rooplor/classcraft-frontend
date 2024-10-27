import type { IHttpResponse } from "../types/HttpResponse";

const useAuth = () => {
    const config = useRuntimeConfig();
    const login = (idToken: string): Promise<IHttpResponse> => {
        return $fetch(`${config.public.baseUrl}/api/auth/login`, {
            body: JSON.stringify({ idToken }),
            method: "POST",
        });
    };

    const logout = (): Promise<IHttpResponse> => {
        return $fetch(`${config.public.baseUrl}/api/logout`, {
            method: "GET",
        });
    };
    return { login, logout };
};

export default useAuth;
