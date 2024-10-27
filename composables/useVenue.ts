import type { IResponse } from "../types/Response";
import type { IVenue } from "../types/Venue";

const useVenue = () => {
    const config = useRuntimeConfig();

    const getAllVenue = (): Promise<IVenue[]> => {
        return $fetch(`${config.public.baseUrl}/api/venue`, {
            method: "GET",
        });
    };

    const getVenueById = (id: string): Promise<IVenue> => {
        return $fetch(`${config.public.baseUrl}/api/venue/${id}`, {
            method: "GET",
        });
    };

    const deleteVenue = (id: string): Promise<IResponse> => {
        return $fetch(`${config.public.baseUrl}/api/venue/${id}`, {
            method: "DELETE",
        });
    };

    return {
        getAllVenue,
        getVenueById,
        deleteVenue,
    };
};

export default useVenue;
