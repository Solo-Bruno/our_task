import { Field, ID } from "@nestjs/graphql";
import { PermissionGraphQLModel } from "./permission.type";

export class RolGraphQLModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  permissions?: PermissionGraphQLModel[];
}