import type { Venue } from "./Venue";

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
    venue: Venue;
    published: boolean;
    imageUrl: string;
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
    FILL_CASS_DETAIL = "fill_classroom_detail",
    RESERVE_VENUE = "reserve_venue",
    CRAFT_CONTENT = "craft_content",
    PREPARE_FOR_REG = "prepare_for_reg",
}

enum EVenueRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
}
