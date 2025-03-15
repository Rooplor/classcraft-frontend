import type {
    EVenueRequestStatus,
    IAddClassroomDTO,
    IClassroom,
    IReservationDateAndVenue,
} from "../types/Classroom";
import type { IContent } from "../types/Content";
import type { IResponse } from "../types/Response";

const useClassroom = () => {
    const config = useRuntimeConfig();

    const getAllClassroom = (
        registrationStatus?: boolean
    ): Promise<IResponse<IClassroom[]>> => {
        return $fetch(`${config.public.baseUrl}/api/class`, {
            params: {
                registrationStatus: registrationStatus,
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
        return $fetch(`${config.public.baseUrl}/api/class`, {
            params: {
                userId: userId.join(","),
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

    const reserveVenue = (
        id: string,
        v: IReservationDateAndVenue[]
    ): Promise<IResponse<boolean>> => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}/reservation`, {
            method: "POST",
            body: JSON.stringify(v),
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

    const deleteClassroom = (id: string): Promise<IResponse<{}>> => {
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

    const setRegistrationStatus = (
        id: string,
        status: boolean
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(
            `${config.public.baseUrl}/api/class/${id}/set-registration-status`,
            {
                body: { status },
                method: "PATCH",
            }
        );
    };

    const setPublishStatus = (
        id: string,
        status: boolean
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(
            `${config.public.baseUrl}/api/class/${id}/set-publish-status`,
            {
                body: { status },
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
        content: IContent[]
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}/content`, {
            body: JSON.stringify(content),
            method: "PATCH",
        });
    };

    const updateClassMaterial = (
        id: string,
        urls: string[]
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(`${config.public.baseUrl}/api/class/${id}/materials`, {
            body: JSON.stringify(urls),
            method: "PATCH",
        });
    }

    const updateClassroomStatus = (
        id: string,
        status: string
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(
            `${config.public.baseUrl}/api/class/${id}/stepper-status`,
            {
                query: {
                    status,
                },
                method: "PATCH",
            }
        );
    };

    const updateVenueStatus = (
        classroomId: string,
        venueStatusId: EVenueRequestStatus,
        rejectReason?: string
    ): Promise<IResponse<IClassroom>> => {
        return $fetch(
            `${config.public.baseUrl}/api/class/${classroomId}/venue-status`,
            {
                params: {
                    venueStatusId,
                    rejectReason,
                },
                method: "GET",
            }
        );
    };

    const searchByTitleOrDetail = (
        keyword: string
    ): Promise<IResponse<IClassroom[]>> => {
        return $fetch(`${config.public.baseUrl}/api/class/search`, {
            params: {
                keyword,
            },
            method: "GET",
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
        setRegistrationStatus,
        setPublishStatus,
        updateRegistrationUrl,
        updateMeetingUrl,
        updateContent,
        updateClassMaterial,
        updateClassroomStatus,
        reserveVenue,
        updateVenueStatus,
        searchByTitleOrDetail,
    };
};

export default useClassroom;
