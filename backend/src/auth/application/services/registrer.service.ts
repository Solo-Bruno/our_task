import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserOrmEntity } from '../../../user/infrastructure/persistence/typeorm/entities/user.orm-entity';
import { JwtPayload } from '../../infrastructure/strategies/jwt.strategy';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterResult {
  accessToken: string;
  userId: string;
  email: string;
  name: string;
  rolName?: string;
}

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepo: Repository<UserOrmEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(params: RegisterParams): Promise<RegisterResult> {
    const existingUser = await this.userRepo.findOne({
      where: { email: params.email },
    });

    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    const user = this.userRepo.create({
      name: params.name,
      email: params.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepo.save(user);

    const payload: JwtPayload = {
      sub: savedUser.id,
      email: savedUser.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      userId: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
    };
  }
}