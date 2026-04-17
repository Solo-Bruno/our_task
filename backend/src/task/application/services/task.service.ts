import { Injectable, Inject } from '@nestjs/common';
import { TaskRepositoryInterface } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepositoryInterface')
    private readonly repository: TaskRepositoryInterface,
  ) {}
}
