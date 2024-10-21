import type { addClassroomDTO, Classroom } from "../types/Classroom";

const useClassroom = () => {
    const config = useRuntimeConfig();

    const getAllClassroom = () => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            params: {
                registrationStatus: false,
            },
            method: "GET",
        });
    };

    const addClassroom = (classroom: addClassroomDTO) => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            method: "POST",
            body: JSON.stringify(classroom),
        });
    };

    const getClassroomById = (id: string): Promise<Classroom> => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}`, {
            method: "GET",
        });
    };

    const updateClassroom = (id: string, classroom: addClassroomDTO) => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}`, {
            method: "PUT",
            body: JSON.stringify(classroom),
        });
    };

    const deleteClassroom = (id: string) => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}`, {
            method: "DELETE",
        });
    };
    return {
        getAllClassroom,
        addClassroom,
        getClassroomById,
        updateClassroom,
        deleteClassroom,
    };
};

export default useClassroom;
