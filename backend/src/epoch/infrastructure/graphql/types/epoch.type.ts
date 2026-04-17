import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Epoch')
export class EpochGraphQLModel {
  @Field(() => ID)
  id: string;
}
