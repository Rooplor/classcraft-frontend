import type { IResponse } from "../types/Response";
import type { IVenue } from "../types/Venue";

const useVenue = () => {
    const config = useRuntimeConfig();

    const getAllVenue = (): Promise<IResponse<IVenue[]>> => {
        return $fetch(`${config.public.baseUrl}/api/venue`, {
            method: "GET",
        });
    };

    const addVenue = (venue: IVenue): Promise<IResponse<IVenue>> => {
        return $fetch(`${config.public.baseUrl}/api/venue`, {
            body: JSON.stringify(venue),
            method: "POST",
        });
    };

    const deleteVenue = (id: string) => {
        return $fetch(`${config.public.baseUrl}/api/venue/${id}`, {
            method: "DELETE",
        });
    };

    return {
        getAllVenue,
        addVenue,
        deleteVenue,
    };
};

export default useVenue;
