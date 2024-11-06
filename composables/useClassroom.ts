import type { IAddClassroomDTO, IClassroom } from "../types/Classroom";
import type { IResponse } from "../types/Response";

const useClassroom = () => {
    const config = useRuntimeConfig();

    const getAllClassroom = (): Promise<IResponse<IClassroom[]>> => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            params: {
                registrationStatus: false,
            },
            method: "GET",
        });
    };

    const getClassroomById = (id: string): Promise<IResponse<IClassroom>> => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}`, {
            method: "GET",
        });
    };

    const getClassroomByUserId = (
        userId: string[]
    ): Promise<IResponse<IClassroom[]>> => {
        return $fetch(`${config.public.baseUrl}/api/class/owners`, {
            params: {
                owners: userId.join(","),
            },
            method: "GET",
        });
    };

    const addClassroom = (
        classroom: IAddClassroomDTO
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            method: "POST",
            body: JSON.stringify(classroom),
        });
    };

    const updateClassroom = (
        id: string,
        classroom: IAddClassroomDTO
    ): Promise<IResponse<IClassroom>> => {
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

    const updateVenue = (
        id: string,
        venue: string
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(
            `${config.public.baseUrl}/api/class/${id}/venue/${venue}`,
            {
                method: "PATCH",
            }
        );
    };

    const toggleRegistrationStatus = (
        id: string
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(
            `${config.public.baseUrl}/api/class/${id}/toggle-registration-status`,
            {
                method: "PATCH",
            }
        );
    };

    const togglePublishStatus = (
        id: string
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(
            `${config.public.baseUrl}/api/class/${id}/toggle-publish-status`,
            {
                method: "PATCH",
            }
        );
    };

    const updateRegistrationUrl = (
        id: string,
        registrationUrl: string
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(
            `${config.public.baseUrl}/api/class/${id}/registration-url`,
            {
                body: registrationUrl,
                method: "PATCH",
            }
        );
    };

    const updateMeetingUrl = (
        id: string,
        meetingUrl: string
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}/meeting-url`, {
            body: meetingUrl,
            method: "PATCH",
        });
    };

    const updateContent = (
        id: string,
        content: string
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}/content`, {
            body: content,
            method: "PATCH",
        });
    };

    return {
        getAllClassroom,
        getClassroomById,
        getClassroomByUserId,
        addClassroom,
        updateClassroom,
        deleteClassroom,
        updateVenue,
        toggleRegistrationStatus,
        togglePublishStatus,
        updateRegistrationUrl,
        updateMeetingUrl,
        updateContent,
    };
};

export default useClassroom;
