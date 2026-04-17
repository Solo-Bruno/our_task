import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRepositoryInterface } from '../../../../domain/repositories/task.repository.interface';
import { TaskOrmEntity } from '../entities/task.orm-entity';

@Injectable()
export class TypeOrmTaskRepository implements TaskRepositoryInterface {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly repository: Repository<TaskOrmEntity>,
  ) {}
}
