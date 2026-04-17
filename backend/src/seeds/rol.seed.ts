import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/rol.orm-entity';
import { PermissionOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/permission.orm-entity';

// Permisos que el rol Normal NO tiene
const NORMAL_EXCLUDED = [
  'DELETE_PROJECT',
  'MANAGE_USERS',
  'ASSIGN_USER_TO_TASK',
  'REMOVE_USER_FROM_TASK',
];

@Injectable()
export class RolSeed {
  constructor(
    @InjectRepository(RolOrmEntity)
    private readonly rolRepo: Repository<RolOrmEntity>,
    @InjectRepository(PermissionOrmEntity)
    private readonly permissionRepo: Repository<PermissionOrmEntity>,
  ) {}

  async run(): Promise<RolOrmEntity[]> {
    const existing = await this.rolRepo.find();

    if (existing.length > 0) {
      console.log(
        `[RolSeed] Ya existen ${existing.length} roles, omitiendo.`,
      );
      return existing;
    }

    const allPermissions = await this.permissionRepo.find();

    const normalPermissions = allPermissions.filter(
      (p) => !NORMAL_EXCLUDED.includes(p.name),
    );

    const roles: Partial<RolOrmEntity>[] = [
      {
        name: 'admin',
        permissions: allPermissions,
      },
      {
        name: 'normal',
        permissions: normalPermissions,
      },
    ];

    const saved = await this.rolRepo.save(roles);
    console.log(`[RolSeed] ${saved.length} roles creados.`);
    return saved;
  }
}
