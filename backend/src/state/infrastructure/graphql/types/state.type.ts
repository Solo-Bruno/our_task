import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('State')
export class StateGraphQLModel {
  @Field(() => ID)
  id: string;
}
