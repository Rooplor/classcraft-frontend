import type { IResponse } from "../types/Response";
import type { IForm, IFormSubmission } from "../types/Form";

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

  const submitForm = (form: IForm): Promise<IResponse<IFormSubmission>> => {
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
  ): Promise<IResponse<IFormSubmission>> => {
    return $fetch(
      `${config.public.baseUrl}/api/form/submissions/${classroomId}`,
      {
        method: "GET",
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
  };
};

export default useForm;
