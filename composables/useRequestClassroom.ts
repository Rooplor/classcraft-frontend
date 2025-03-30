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

  const getRequestsByClassroomOwnerId = (
    ownerId?: string
  ): Promise<IResponse<IClassroomRequest[]>> => {
    return $fetch(`${config.public.baseUrl}/api/request/owner/${ownerId}`, {
      method: "GET",
    });
  };

  return {
    sendClassroomRequest,
    deleteClassroomRequest,
    getRequestsByClassroomOwnerId,
  };
};

export default useRequestClassroom;
