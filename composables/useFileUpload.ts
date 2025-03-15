import type { IResponse } from "../types/Response";

const useFileUpload = () => {
    const config = useRuntimeConfig();

    const uploadFile = (
        formData: FormData
    ): Promise<IResponse<{ urls: string[] }>> => {
        return $fetch(`${config.public.baseUrl}/api/file/upload`, {
            body: formData,
            method: "POST",
        });
    };
    
    const removeFile = (url: string): Promise<IResponse<null>> => {
      return $fetch(`${config.public.baseUrl}/api/file/remove?fileUrl=${url}`, {
        method: "POST",
      });
    };

    return { uploadFile, removeFile };
};

export default useFileUpload;
