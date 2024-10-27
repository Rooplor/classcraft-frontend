import type { IAddClassroomDTO, IClassroom } from "../types/Classroom";
import type { IHttpResponse } from "../types/HttpResponse";

const useClassroom = () => {
    const config = useRuntimeConfig();

    const getAllClassroom = (): Promise<IClassroom[]> => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            params: {
                registrationStatus: false,
            },
            method: "GET",
        });
    };

    const addClassroom = (classroom: IAddClassroomDTO): Promise<IClassroom> => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            method: "POST",
            body: JSON.stringify(classroom),
        });
    };

    const getClassroomById = (id: string): Promise<IClassroom> => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}`, {
            method: "GET",
        });
    };

    const updateClassroom = (
        id: string,
        classroom: IAddClassroomDTO
    ): Promise<IClassroom> => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}`, {
            method: "PUT",
            body: JSON.stringify(classroom),
        });
    };

    const deleteClassroom = (id: string): Promise<IHttpResponse> => {
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
