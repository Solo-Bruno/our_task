import { UserEntity } from "../../../user/domain/entities/user.entity";

export class TaskEntity {
  id: string;
  name: string;
  description: string;
  startedAt: Date;
  endedAt: Date;

  stateId: string;
  users?: UserEntity[];
}
