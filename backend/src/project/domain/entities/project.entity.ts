import { EpochEntity } from "../../../epoch/domain/entities/epoch.entity";
import { UserEntity } from "../../../user/domain/entities/user.entity";

export class ProjectEntity {
  id: string;
  name: string;
  startedAt: Date;
  endedAt: Date;

  users?: UserEntity[];
  epochs?: EpochEntity[];
}
