import { StateEntity } from '../../../../domain/entities/state.entity';
import { StateOrmEntity } from '../entities/state.orm-entity';

export class StateMapper {
  static toDomain(ormEntity: StateOrmEntity): StateEntity {
    const entity = new StateEntity();
    entity.id = ormEntity.id;
    return entity;
  }
}
