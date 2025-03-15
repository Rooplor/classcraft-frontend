import type { IResponse } from "../types/Response";
import type { EAttendeeStatus, IForm, IFormSubmission } from "../types/Form";
import type { IUser } from "../types/User";

const useForm = () => {
  const config = useRuntimeConfig();

  const getFormById = (id: string): Promise<IResponse<IForm>> => {
    return $fetch(`${config.public.baseUrl}/api/form/${id}`, {
      method: "GET",
    });
  };

  const addForm = (form: IForm): Promise<IResponse<IForm>> => {
    return $fetch(`${config.public.baseUrl}/api/form`, {
      body: JSON.stringify(form),
      method: "POST",
    });
  };

  const deleteForm = (id: string) => {
    return $fetch(`${config.public.baseUrl}/api/form/${id}`, {
      method: "DELETE",
    });
  };

  const updateForm = (form: Partial<IForm>): Promise<IResponse<IForm>> => {
    return $fetch(`${config.public.baseUrl}/api/form/${form.id}`, {
      body: JSON.stringify(form),
      method: "PUT",
    });
  };

  const submitForm = (
    form: Partial<IFormSubmission>
  ): Promise<IResponse<IFormSubmission>> => {
    return $fetch(`${config.public.baseUrl}/api/form/submit`, {
      body: JSON.stringify(form),
      method: "POST",
    });
  };

  const getFormQuestions = (id: string): Promise<IResponse<{}>> => {
    return $fetch(`${config.public.baseUrl}/api/form/${id}/questions`, {
      method: "GET",
    });
  };

  const getFormCSV = (id: string): Promise<string> => {
    return $fetch(`${config.public.baseUrl}/api/form/${id}/csv`, {
      method: "GET",
    });
  };

  const getUserFormSubmissions = (
    userId: string,
    id: string
  ): Promise<IResponse<IFormSubmission>> => {
    return $fetch(
      `${config.public.baseUrl}/api/form/submissions?userId=${userId}&formId=${id}`,
      {
        method: "GET",
      }
    );
  };

  const getClassroomFormSubmission = (
    classroomId: string
  ): Promise<IResponse<IFormSubmission[]>> => {
    return $fetch(
      `${config.public.baseUrl}/api/form/submissions/${classroomId}`,
      {
        method: "GET",
      }
    );
  };

  const getClassroomFormSubmissionByUserId = (
    userId: string
  ): Promise<IResponse<IFormSubmission[]>> => {
    return $fetch(
      `${config.public.baseUrl}/api/form/submissions/user/${userId}`,
      {
        method: "GET",
      }
    );
  };

  const getUserInClassroom = (
    classroomId: string
  ): Promise<IResponse<IUser[]>> => {
    return $fetch(`${config.public.baseUrl}/api/form/user/${classroomId}`, {
      method: "GET",
    });
  };

  const setApprovalStatus = (
    id: string,
    isApproved: boolean
  ): Promise<IResponse<IFormSubmission>> => {
    return $fetch(
      `${config.public.baseUrl}/api/form/isApprovedByOwner/${id}?isApproved=${isApproved}`,
      {
        method: "PATCH",
      }
    );
  };

  const getCheckInQrCode = (id: string): Promise<any> => {
    return $fetch(`${config.public.baseUrl}/api/form/qrcode/checkin/${id}`, {
      method: "GET",
    });
  };

  const setAttendeeStatus = (
    id: string,
    status: EAttendeeStatus,
    day: number,
  ): Promise<IResponse<IFormSubmission>> => {
    return $fetch(
      `${config.public.baseUrl}/api/form/attendees/${id}?status=${status}&day=${day}`,
      {
        method: "PATCH",
      }
    );
  };

  return {
    getFormById,
    addForm,
    deleteForm,
    updateForm,
    submitForm,
    getFormQuestions,
    getFormCSV,
    getUserFormSubmissions,
    getClassroomFormSubmission,
    getClassroomFormSubmissionByUserId,
    getUserInClassroom,
    setApprovalStatus,
    getCheckInQrCode,
    setAttendeeStatus,
  };
};

export default useForm;
