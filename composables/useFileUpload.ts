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

    return { uploadFile };
};

export default useFileUpload;
