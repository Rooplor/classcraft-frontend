const useAuth = () => {
    const config = useRuntimeConfig();
    // const { data } = useAuth();
    // const accessToken = data.value?.user?.accessToken;

    const login = (idToken: string) => {
        return $fetch(`${config.public.baseUrl}/api/auth/login`, {
            body: JSON.stringify({ idToken }),
            method: "POST",
        });
    };

    const logout = () => {
        return $fetch(`${config.public.baseUrl}/api/logout`, {
            method: "GET",
        });
    };
    return { login, logout };
};

export default useAuth;
