import type { IVenue } from "./Venue";

export interface IClassroom {
    id: string;
    title: string;
    details: string;
    target: string;
    prerequisite: string;
    type: EClassroomType;
    format: EClassroomFormat;
    capacity: number;
    date: Date[];
    stepperStatus: EStepperStatus;
    meetingUrl: string;
    content: string;
    registrationUrl: string;
    registrationStatus: boolean;
    venueStatus: EVenueRequestStatus;
    venue: IVenue;
    published: boolean;
    instructorName: string;
    instructorBio: string;
    instructorAvatar: string;
    instructorFamiliarity: string;
    owner: string;
    coOwners: string[];
    coverImage: string;
}

export interface IAddClassroomDTO {
    title: string;
    details: string;
    target: string;
    prerequisite: string;
    type: EClassroomType;
    format: EClassroomFormat;
    capacity: number;
    date: Date;
}

enum EClassroomType {
    LECTURE,
    WORKSHOP,
    DISCUSSION,
}

enum EClassroomFormat {
    ONSITE,
    ONLINE,
    MIXED,
}

enum EStepperStatus {
    FILL_CLASS_DETAIL = 1,
    RESERVE_VENUE = 2,
    CRAFT_CONTENT = 3,
    PREPARE_FOR_REG = 4,
}

enum EVenueRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
}
