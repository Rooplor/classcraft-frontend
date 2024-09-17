import type { Venue } from "./Venue";

interface Classroom {
    id: string;
    title: string;
    details: string;
    target: string;
    prerequisite: string;
    type: ClassroomType;
    format: ClassroomFormat;
    capacity: number;
    date: Date;
    stepperStatus: StepperStatus;
    meetingUrl: string;
    content: string;
    registrationUrl: string;
    registrationStatus: boolean;
    venueStatus: VenueRequestStatus;
    venue: Venue;
    published: boolean;
}

interface addClassroomDTO {
    title: string;
    details: string;
    target: string;
    prerequisite: string;
    type: ClassroomType;
    format: ClassroomFormat;
    capacity: number;
    date: Date;
}

enum ClassroomType {
    LECTURE,
    WORKSHOP,
    DISCUSSION,
}

enum ClassroomFormat {
    ONSITE,
    ONLINE,
    MIXED,
}

enum StepperStatus {
    FILL_CASS_DETAIL = "fill_classroom_detail",
    RESERVE_VENUE = "reserve_venue",
    CRAFT_CONTENT = "craft_content",
    PREPARE_FOR_REG = "prepare_for_reg",
}

enum VenueRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
}

export type { Classroom, addClassroomDTO };
