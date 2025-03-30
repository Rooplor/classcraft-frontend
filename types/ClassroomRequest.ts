import type { IClassroom } from "./Classroom";
import type { IUser } from "./User";

export interface IClassroomRequest {
  id: string;
  classroomId: string;
  classroomDetail: Partial<IClassroom>,
  ownerId: string;
  requestList: IRequestDetail[];
}

interface IRequestDetail {
  requestedBy: Partial<IUser>;
  requestedAt: string;
}
