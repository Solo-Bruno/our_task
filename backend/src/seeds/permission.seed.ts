import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/permission.orm-entity';

const PERMISSIONS = [
  { name: 'CREATE_PROJECT', description: 'Puede crear proyectos' },
  { name: 'EDIT_PROJECT', description: 'Puede editar proyectos' },
  { name: 'DELETE_PROJECT', description: 'Puede eliminar proyectos' },
  { name: 'CREATE_TASK', description: 'Puede crear tareas' },
  { name: 'EDIT_TASK', description: 'Puede editar tareas' },
  { name: 'DELETE_TASK', description: 'Puede eliminar tareas' },
  { name: 'MANAGE_USERS', description: 'Puede gestionar usuarios' },
  { name: 'VIEW_REPORTS', description: 'Puede ver reportes' },
  { name: 'ASSIGN_USER_TO_TASK', description: 'Puede asignar un usuario a una tarea' },
  { name: 'REMOVE_USER_FROM_TASK', description: 'Puede quitar un usuario de una tarea' },
];

@Injectable()
export class PermissionSeed {
  constructor(
    @InjectRepository(PermissionOrmEntity)
    private readonly permissionRepo: Repository<PermissionOrmEntity>,
  ) {}

  async run(): Promise<PermissionOrmEntity[]> {
    const existing = await this.permissionRepo.find();

    if (existing.length > 0) {
      console.log(
        `[PermissionSeed] Ya existen ${existing.length} permisos, omitiendo.`,
      );
      return existing;
    }

    const permissions = this.permissionRepo.create(PERMISSIONS);
    const saved = await this.permissionRepo.save(permissions);
    console.log(`[PermissionSeed] ${saved.length} permisos creados.`);
    return saved;
  }
}
