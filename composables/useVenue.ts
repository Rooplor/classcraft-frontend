import type { IResponse } from "../types/Response";
import type { IVenue } from "../types/Venue";

const useVenue = () => {
    const config = useRuntimeConfig();

    const getAllVenue = (): Promise<IResponse<IVenue[]>> => {
        return $fetch(`${config.public.baseUrl}/api/venue`, {
            method: "GET",
        });
    };

    const getVenueById = (id: string): Promise<IResponse<IVenue>> => {
        return $fetch(`${config.public.baseUrl}/api/venue/${id}`, {
            method: "GET",
        });
    };

    const getVenueByIds = (ids: string[]): Promise<IResponse<IVenue[]>> => {
        return $fetch(
            `${config.public.baseUrl}/api/venue/ids?ids=${ids.join("ids=")}`,
            {
                method: "GET",
            }
        );
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
        getVenueById,
        getVenueByIds,
        addVenue,
        deleteVenue,
    };
};

export default useVenue;
