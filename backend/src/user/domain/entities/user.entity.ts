import { RolEntity } from "./rol.entity";

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;

  rol?: RolEntity;
}
