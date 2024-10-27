interface IVenue {
    id: number;
    room: string;
    location: {
        building: string;
        floor: number;
    };
    description: string;
    capacity: number;
    imageUrl: string;
}

export const mockVenues: IVenue[] = [
    {
        id: 1,
        room: "Train 3",
        location: {
            building: "SIT Building",
            floor: 1,
        },
        description: "Train 3 is a small room that can accommodate 40 people.",
        capacity: 40,
        imageUrl: "https://picsum.photos/300",
    },
    {
        id: 2,
        room: "Train 5",
        location: {
            building: "SIT Building",
            floor: 1,
        },
        description: "Train 5 is a small room that can accommodate 40 people.",
        capacity: 40,
        imageUrl: "https://picsum.photos/300",
    },
    {
        id: 3,
        room: "LX10 - 1",
        location: {
            building: "LX Building",
            floor: 10,
        },
        description: "LX10 - 1 is a small room that can accommodate 40 people.",
        capacity: 40,
        imageUrl: "https://picsum.photos/300",
    },
    {
        id: 4,
        room: "LX10 - 2",
        location: {
            building: "LX Building",
            floor: 10,
        },
        description: "LX10 - 2 is a small room that can accommodate 40 people.",
        capacity: 40,
        imageUrl: "https://picsum.photos/300",
    },
    {
        id: 5,
        room: "LX10 - 3",
        location: {
            building: "LX Building",
            floor: 10,
        },
        description: "LX10 - 3 is a small room that can accommodate 40 people.",
        capacity: 40,
        imageUrl: "https://picsum.photos/300",
    },
    {
        id: 6,
        room: "LX11 - 3",
        location: {
            building: "LX Building",
            floor: 11,
        },
        description: "LX10 - 3 is a small room that can accommodate 40 people.",
        capacity: 40,
        imageUrl: "https://picsum.photos/300",
    },
];

export type { IVenue as Venue };
