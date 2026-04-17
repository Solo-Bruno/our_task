import { TaskEntity } from "../../../task/domain/entities/task.entity";

export class StateEntity {
  id: string;
  name: string;

  epochId: string;
  tasks?: TaskEntity[];
}
