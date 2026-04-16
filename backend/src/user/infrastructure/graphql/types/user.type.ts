import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('User')
export class UserGraphQLModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  rolId?: string;
}
