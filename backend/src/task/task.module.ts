import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskResolver } from './infrastructure/graphql/resolvers/task.resolver';
import { TaskService } from './application/services/task.service';
import { TaskOrmEntity } from './infrastructure/persistence/typeorm/entities/task.orm-entity';
import { TypeOrmTaskRepository } from './infrastructure/persistence/typeorm/repositories/typeorm-task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity])],
  providers: [
    TaskResolver,
    TaskService,
    {
      provide: 'TaskRepositoryInterface',
      useClass: TypeOrmTaskRepository,
    },
  ],
  exports: [TaskService],
})
export class TaskModule {}
