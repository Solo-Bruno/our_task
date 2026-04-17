import { ProjectEntity } from '../../../../domain/entities/project.entity';
import { ProjectOrmEntity } from '../entities/project.orm-entity';

export class ProjectMapper {
  static toDomain(ormEntity: ProjectOrmEntity): ProjectEntity {
    const entity = new ProjectEntity();
    entity.id = ormEntity.id;
    return entity;
  }
}
