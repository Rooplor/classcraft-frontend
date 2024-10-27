import type { IFileUpload } from "../types/FileUpload";

const useFileUpload = () => {
    const config = useRuntimeConfig();

    const uploadFile = (formData: FormData): Promise<IFileUpload> => {
        return $fetch(`${config.public.baseUrl}/api/file/upload`, {
            body: formData,
            method: "POST",
        });
    };

    return { uploadFile };
};

export default useFileUpload;
