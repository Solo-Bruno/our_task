import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Task')
export class TaskGraphQLModel {
  @Field(() => ID)
  id: string;
}
