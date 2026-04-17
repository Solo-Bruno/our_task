import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ProjectGraphQLModel } from '../types/project.type';
import { ProjectService } from '../../../application/services/project.service';
import { CreateProjectInput } from '../../../application/dto/create-project.input';

@Resolver(() => ProjectGraphQLModel)
export class ProjectResolver {
  constructor(private readonly service: ProjectService) {}
}
