import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { StateGraphQLModel } from '../types/state.type';
import { StateService } from '../../../application/services/state.service';
import { CreateStateInput } from '../../../application/dto/create-state.input';

@Resolver(() => StateGraphQLModel)
export class StateResolver {
  constructor(private readonly service: StateService) {}
}
