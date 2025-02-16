interface IForm {
  id: string;
  classroomId: string;
  title: string;
  description: string;
  openDate?: string;
  closeDate?: string;
  fields: IField[];
  ownerApprovalRequired: boolean;
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
  submittedBy: string;
  userDetail: {
    id: string;
    username: string;
    profilePicture: string;
  };
  approvedByOwner: boolean;
  attendeesStatus: EAttendeeStatus;
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

export { type IForm, type IFormSubmission, EFieldValidation, EAttendeeStatus };
