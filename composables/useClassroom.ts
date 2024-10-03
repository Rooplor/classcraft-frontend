import type { addClassroomDTO } from "../types/Classroom";

const useClassroom = () => {
    const config = useRuntimeConfig();
    // const { data } = useAuth();
    // const accessToken = data.value?.user?.accessToken;

    const getAllClassroom = () => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            method: "GET",
        });
    };

    const addClassroom = (classroom: addClassroomDTO) => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            method: "POST",
            body: JSON.stringify(classroom),
        });
    };

    const getClassroomById = (id: string) => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}`, {
            method: "GET",
        });
    };
    return { getAllClassroom, addClassroom, getClassroomById };
};

export default useClassroom;
