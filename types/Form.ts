interface IForm {
  id: string;
  classroomId: string;
  title: string;
  description: string;
  openDate: string;
  closeDate: string;
  fields: IField[];
}

interface IField {
  name: string;
  type: string;
  required: boolean;
  validation: string;
  options: string[];
}

interface IFormSubmission {
  id: string;
  formId: string;
  classroomId: string;
  responses: any[];
  submittedBy: string;
}

export type { IForm, IFormSubmission };
