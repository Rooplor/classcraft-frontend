import type { IUser } from "./User";

export interface IClassroomRequest {
  id: string;
  classroomId: string;
  ownerId: string;
  requestList: IRequestDetail[];
}

interface IRequestDetail {
  requestedBy: Partial<IUser>;
  requestedAt: string;
}
