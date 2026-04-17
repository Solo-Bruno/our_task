import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/user.orm-entity';
import { RolOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/rol.orm-entity';

const SALT_ROUNDS = 10;

@Injectable()
export class UserSeed {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepo: Repository<UserOrmEntity>,
    @InjectRepository(RolOrmEntity)
    private readonly rolRepo: Repository<RolOrmEntity>,
  ) {}

  async run(): Promise<UserOrmEntity[]> {
    const existing = await this.userRepo.find();

    if (existing.length > 0) {
      console.log(
        `[UserSeed] Ya existen ${existing.length} usuarios, omitiendo.`,
      );
      return existing;
    }

    const adminRol = await this.rolRepo.findOne({ where: { name: 'admin' } });
    const normalRol = await this.rolRepo.findOne({ where: { name: 'normal' } });

    const users: Partial<UserOrmEntity>[] = [
      {
        name: 'Bruno',
        email: 'bruno.lapaz@aeropuertosuruguay.com.uy',
        password: await bcrypt.hash('password1234', SALT_ROUNDS),
        rol: adminRol ?? undefined,
      },
      {
        name: 'Nico',
        email: 'nico.silveira@aeropuertosuruguay.com.uy',
        password: await bcrypt.hash('pasword4567', SALT_ROUNDS),
        rol: normalRol ?? undefined,
      },
    ];

    const saved = await this.userRepo.save(users);
    console.log(`[UserSeed] ${saved.length} usuarios creados.`);
    return saved;
  }
}
