import { PermissionEntity } from './permission.entity';

export class RolEntity {
  id: string;
  name: string;

  permissions?: PermissionEntity[];
}