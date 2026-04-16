import { Field, ID } from "@nestjs/graphql";

export class PermissionGraphQLModel {
    @Field(() => ID)
    id: string;
  
    @Field()
    name: string;
  
    @Field()
    description: string;
  
}