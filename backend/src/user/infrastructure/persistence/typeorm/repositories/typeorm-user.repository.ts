import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryInterface, UserWithRol } from '../../../../domain/repositories/user.repository.interface';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class TypeOrmUserRepository extends UserRepositoryInterface {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {
    super();
  }

  async findByEmailWithRol(email: string): Promise<UserWithRol | null> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['rol', 'rol.permissions'],
    });
    if (!user) {
      return null;
    }
    return user
  };

  async findByIdWithRol(id: string): Promise<UserWithRol | null> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['rol', 'rol.permissions'],
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
