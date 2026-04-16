import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

export class UserMapper {
  static toDomain(ormEntity: UserOrmEntity): UserEntity {
    const entity = new UserEntity();
    entity.id = ormEntity.id;
    return entity;
  }
}
