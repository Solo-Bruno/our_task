import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './infrastructure/graphql/resolvers/user.resolver';
import { UserService } from './application/services/user.service';
import { UserOrmEntity } from './infrastructure/persistence/typeorm/entities/user.orm-entity';
import { TypeOrmUserRepository } from './infrastructure/persistence/typeorm/repositories/typeorm-user.repository';
import { RolOrmEntity } from './infrastructure/persistence/typeorm/entities/rol.orm-entity';
import { PermissionOrmEntity } from './infrastructure/persistence/typeorm/entities/permission.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity, RolOrmEntity, PermissionOrmEntity])],
  providers: [
    UserResolver,
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
