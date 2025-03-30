import type { IUser } from "./User";

interface IForm {
  id: string;
  classroomId: string;
  title: string;
  description: string;
  openDate?: string;
  closeDate?: string;
  fields: IField[];
  ownerApprovalRequired: boolean;
  feedback: IField[];
}

interface IField {
  name: string;
  type: string;
  required: boolean;
  validation: EFieldValidation;
  options: string[];
}

interface IFormSubmission {
  id: string;
  formId: string;
  classroomId: string;
  responses: any;
  feedbackResponse: any;
  submittedBy: string;
  userDetail: Partial<IUser>;
  approvedByOwner: boolean;
  attendeesStatus: {
    day: number;
    attendeesStatus: EAttendeeStatus;
    date: string;
    checkInDateTime: string;
  }[];
}

enum EFieldValidation {
  Text = "TEXT",
  Email = "EMAIL",
  Number = "NUMBER",
  Phone = "PHONE",
  URL = "URL",
}

enum EAttendeeStatus {
  Present = "PRESENT",
  Absent = "ABSENT",
  Late = "LATE",
  Not_Going = "NOT_GOING",
  Pending = "PENDING",
}

export {
  type IForm,
  type IField,
  type IFormSubmission,
  EFieldValidation,
  EAttendeeStatus,
};
