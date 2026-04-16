import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserGraphQLModel } from '../types/user.type';
import { UserService } from '../../../application/services/user.service';
import { CreateUserInput } from '../../../application/dto/create-user.input';

@Resolver(() => UserGraphQLModel)
export class UserResolver {
  constructor(private readonly service: UserService) {}
}
