import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectGraphQLModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startedAt: Date;

  @Field()
  endedAt: Date;
}
