import { StateEntity } from "../../../state/domain/entities/state.entity";

export class EpochEntity {
  id: string;
  name: string;
  startedAt: Date;
  endedAt: Date;
  color: string;

  projectId: string;
  states?: StateEntity[];
}
