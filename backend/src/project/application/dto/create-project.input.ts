import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  startedAt: Date;

  @Field()
  endedAt: Date;
}
