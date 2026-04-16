import { UserEntity } from '../entities/user.entity';

export abstract class UserRepositoryInterface {
    abstract findByEmailWithRol(email: string): Promise<UserWithRol | null>;
    abstract findByIdWithRol(id: string): Promise<UserWithRol | null>;   
}

export interface UserWithRol {
  id: string;
  name: string;
  email: string;
  password: string;
  rol?: {
    id: string;
    name: string;
    permissions?: {
      id: string;
      name: string;
      description: string;
    }[];
  };
}
