const useFileUpload = () => {
    const config = useRuntimeConfig();

    const uploadFile = (classId: string, file: string) => {
        return $fetch(`${config.public.baseUrl}/api/file/upload`, {
            params: {
                classId: classId,
            },
            body: {
                file: file,
            },
            method: "POST",
        });
    };

    return { uploadFile };
};

export default useFileUpload;
