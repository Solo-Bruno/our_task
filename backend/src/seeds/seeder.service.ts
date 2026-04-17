import { Injectable } from '@nestjs/common';
import { PermissionSeed } from './permission.seed';
import { RolSeed } from './rol.seed';
import { UserSeed } from './user.seed';

@Injectable()
export class SeederService {
  constructor(
    private readonly permissionSeed: PermissionSeed,
    private readonly rolSeed: RolSeed,
    private readonly userSeed: UserSeed,
  ) {}

  async run(): Promise<void> {
    console.log('=== Iniciando seeder ===');
    await this.permissionSeed.run();
    await this.rolSeed.run();
    await this.userSeed.run();
    console.log('=== Seeder finalizado ===');
  }
}
