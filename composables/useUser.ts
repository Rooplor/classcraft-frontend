import type { IResponse } from "../types/Response";
import type { IListUserResponse, IResponseUser, IUser } from "../types/User";

const useUser = () => {
    const config = useRuntimeConfig();

    const getAllUser = (): Promise<IListUserResponse> => {
        return $fetch(`${config.public.baseUrl}/api/user`, {
            method: "GET",
        });
    };

    const getUserById = (id: string): Promise<IResponseUser> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            method: "GET",
        });
    };

    const updateUser = (id: string, user: IUser): Promise<IResponseUser> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            body: JSON.stringify(user),
            method: "GET",
        });
    };

    const deleteUser = (id: string): Promise<IResponse> => {
        return $fetch(`${config.public.baseUrl}/api/user/${id}`, {
            method: "DELETE",
        });
    };

    const addNewUser = (user: IUser): Promise<IResponseUser> => {
        return $fetch(`${config.public.baseUrl}/api/user`, {
            body: JSON.stringify(user),
            method: "POST",
        });
    };

    const getProfile = (): Promise<IResponseUser> => {
        return $fetch(`${config.public.baseUrl}/api/user/profile`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxOGY0ZGY5MmFkMTc1ZjZhMDMwN2FiNjVkOGY2N2YwNTRmYTFlNWYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSmVyb21lIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pOWkRfRFRXRWV2NnpGUnp6bk83UktiWHNFX0tqTzlodE04eTVOdDQ0dGh4Tk9CV2RaaUE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2xhc3NjcmFmdC1jNGEwMyIsImF1ZCI6ImNsYXNzY3JhZnQtYzRhMDMiLCJhdXRoX3RpbWUiOjE3MzAwNzkzMzgsInVzZXJfaWQiOiJHbW9EMlhodThkVzZJZlRxNjN6ekdRbjZIYTYyIiwic3ViIjoiR21vRDJYaHU4ZFc2SWZUcTYzenpHUW42SGE2MiIsImlhdCI6MTczMDA3OTMzOCwiZXhwIjoxNzMwMDgyOTM4LCJlbWFpbCI6Im5hcm9ua3JhY2hAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTU2NzgyMDg1NDY3MDU4MTkyNjIiXSwiZW1haWwiOlsibmFyb25rcmFjaEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.KU1fz1Raua90-WtAN2eFvmvXJMSHlPV_496G83cS0QVGeT3ACC4DRj_TJ_s64Cwf8q1Y_SeW-PhfgSNkdkOtSKlIkjR_P5eJltDYUoMUJV2ejmruPMed0ojF4PIzZLtTDjxsNZbImAibN1gjmss0vWo66J7Uu9Ug_rSIcMKur8JuMpW8KHr_lFEdlVp1owPOG0yg1yoExUJa3bMOAU0RjZmLYvLRLewmyrLTOl6FNioaQCv6xGWiUQm163UjO_xMIqEkXd9craQtS82-oYAXtbPQSbhoiMqfDE-TmSU17rY3ZTGDh7Rr-KtLTVMVpmGUe5puREidZf1Fl9h0Lc9iFQ`,
            },
            method: "GET",
        });
    };

    return {
        getAllUser,
        getUserById,
        updateUser,
        deleteUser,
        addNewUser,
        getProfile,
    };
};

export default useUser;
