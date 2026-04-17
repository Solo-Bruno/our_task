import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/user.orm-entity';
import { RolOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/rol.orm-entity';
import { PermissionOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/permission.orm-entity';
import { ProjectOrmEntity } from '../project/infrastructure/persistence/typeorm/entities/project.orm-entity';
import { TaskOrmEntity } from '../task/infrastructure/persistence/typeorm/entities/task.orm-entity';
import { EpochOrmEntity } from '../epoch/infrastructure/persistence/typeorm/entities/epoch.orm-entity';
import { StateOrmEntity } from '../state/infrastructure/persistence/typeorm/entities/state.orm-entity';
import { PermissionSeed } from './permission.seed';
import { RolSeed } from './rol.seed';
import { UserSeed } from './user.seed';
import { SeederService } from './seeder.service';

const ALL_ENTITIES = [
  UserOrmEntity,
  RolOrmEntity,
  PermissionOrmEntity,
  ProjectOrmEntity,
  TaskOrmEntity,
  EpochOrmEntity,
  StateOrmEntity,
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: ALL_ENTITIES,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserOrmEntity, RolOrmEntity, PermissionOrmEntity]),
  ],
  providers: [SeederService, PermissionSeed, RolSeed, UserSeed],
})
export class SeederModule {}
