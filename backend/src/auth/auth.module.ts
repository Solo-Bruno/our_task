import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/user.orm-entity';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { PermissionsGuard } from './infrastructure/guards/permissions.guard';
import { LoginService } from './application/services/login.service';
import { AuthResolver } from './infrastructure/graphql/resolver/auth.resolver';
import { UserRepositoryInterface } from '../user/domain/repositories/user.repository.interface';
import { TypeOrmUserRepository } from '../user/infrastructure/persistence/typeorm/repositories/typeorm-user.repository';
import { RolOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/rol.orm-entity';
import { PermissionOrmEntity } from '../user/infrastructure/persistence/typeorm/entities/permission.orm-entity';
import { RegisterService } from './application/services/registrer.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (configService.getOrThrow<string>('JWT_EXPIRES_IN') ?? '8h') as any,
        },
      }),
    }),
    TypeOrmModule.forFeature([UserOrmEntity, RolOrmEntity, PermissionOrmEntity]),
  ],

  providers: [
    JwtStrategy,
    JwtAuthGuard,
    PermissionsGuard,
    RegisterService,
    LoginService,
    AuthResolver,
    {
      provide: UserRepositoryInterface,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [JwtAuthGuard, PermissionsGuard, JwtStrategy],
})
export class AuthModule {}
