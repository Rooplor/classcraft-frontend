interface IVenue {
    id: string;
    room: string;
    location: {
        building: string;
        floor: number;
    };
    description: string;
    capacity: number;
    imageUrl: string;
}

export type { IVenue };
