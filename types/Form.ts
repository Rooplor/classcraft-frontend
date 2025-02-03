interface IForm {
  id: string;
  classroomId: string;
  title: string;
  description: string;
  openDate?: string;
  closeDate?: string;
  fields: IField[];
  isOwnerApprovalRequired: boolean;
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
}

enum EFieldValidation {
  Text = "TEXT",
  Email = "EMAIL",
  Number = "NUMBER",
  Phone = "PHONE",
  URL = "URL",
}

export { type IForm, type IFormSubmission, EFieldValidation };
