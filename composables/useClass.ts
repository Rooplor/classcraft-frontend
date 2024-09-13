const useClass = () => {
    const config = useRuntimeConfig();
    // const { data } = useAuth();
    // const accessToken = data.value?.user?.accessToken;

    const getAllClasses = () => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            method: "GET",
            // headers: {
            //     authorization: "Bearer " + accessToken,
            // },
        });
    };
    return { getAllClasses };
};

export default useClass;
