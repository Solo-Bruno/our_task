import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEpochInput {
  @Field()
  name: string;
}
