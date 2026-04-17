import { TaskEntity } from '../../../../domain/entities/task.entity';
import { TaskOrmEntity } from '../entities/task.orm-entity';

export class TaskMapper {
  static toDomain(ormEntity: TaskOrmEntity): TaskEntity {
    const entity = new TaskEntity();
    entity.id = ormEntity.id;
    return entity;
  }
}
