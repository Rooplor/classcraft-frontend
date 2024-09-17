const useClassroom = () => {
    const config = useRuntimeConfig();
    // const { data } = useAuth();
    // const accessToken = data.value?.user?.accessToken;

    const getAllClassroom = () => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            method: "GET",
            // headers: {
            //     authorization: "Bearer " + accessToken,
            // },
        });
    };
    return { getAllClassroom };
};

export default useClassroom;
