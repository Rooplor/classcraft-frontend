import type { IClassroomRequest } from "../types/ClassroomRequest";
import type { IResponse } from "../types/Response";

const useRequestClassroom = () => {
  const config = useRuntimeConfig();

  const sendClassroomRequest = (
    classroomId?: string
  ): Promise<IResponse<IClassroomRequest>> => {
    return $fetch(`${config.public.baseUrl}/api/request/${classroomId}`, {
      method: "GET",
    });
  };

  const deleteClassroomRequest = (
    classroomId?: string
  ): Promise<IResponse<string>> => {
    return $fetch(`${config.public.baseUrl}/api/request/${classroomId}`, {
      method: "DELETE",
    });
  };

  const getRequestsByClassroomOwnerId = (): Promise<
    IResponse<IClassroomRequest[]>
  > => {
    return $fetch(`${config.public.baseUrl}/api/request/owner`, {
      method: "GET",
    });
  };

  const getClassroomRequestExist = (
    classroomId?: string
  ): Promise<IResponse<boolean>> => {
    return $fetch(
      `${config.public.baseUrl}/api/request/exists/${classroomId}`,
      {
        method: "GET",
      }
    );
  };

  const getUserClassroomRequests = (): Promise<
    IResponse<IClassroomRequest[]>
  > => {
    return $fetch(`${config.public.baseUrl}/api/request/my-requests`, {
      method: "GET",
    });
  };

  return {
    sendClassroomRequest,
    deleteClassroomRequest,
    getRequestsByClassroomOwnerId,
    getClassroomRequestExist,
    getUserClassroomRequests,
  };
};

export default useRequestClassroom;
