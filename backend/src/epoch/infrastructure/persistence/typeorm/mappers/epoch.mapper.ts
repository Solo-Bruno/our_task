import { EpochEntity } from '../../../../domain/entities/epoch.entity';
import { EpochOrmEntity } from '../entities/epoch.orm-entity';

export class EpochMapper {
  static toDomain(ormEntity: EpochOrmEntity): EpochEntity {
    const entity = new EpochEntity();
    entity.id = ormEntity.id;
    return entity;
  }
}
