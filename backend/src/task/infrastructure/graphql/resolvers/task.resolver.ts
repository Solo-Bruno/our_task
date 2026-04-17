import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TaskGraphQLModel } from '../types/task.type';
import { TaskService } from '../../../application/services/task.service';
import { CreateTaskInput } from '../../../application/dto/create-task.input';

@Resolver(() => TaskGraphQLModel)
export class TaskResolver {
  constructor(private readonly service: TaskService) {}
}
