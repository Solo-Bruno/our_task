import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectResolver } from './infrastructure/graphql/resolvers/project.resolver';
import { ProjectService } from './application/services/project.service';
import { ProjectOrmEntity } from './infrastructure/persistence/typeorm/entities/project.orm-entity';
import { TypeOrmProjectRepository } from './infrastructure/persistence/typeorm/repositories/typeorm-project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectOrmEntity])],
  providers: [
    ProjectResolver,
    ProjectService,
    {
      provide: 'ProjectRepositoryInterface',
      useClass: TypeOrmProjectRepository,
    },
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
