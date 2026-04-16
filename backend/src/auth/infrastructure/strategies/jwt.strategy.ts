import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepositoryInterface } from "../../../user/domain/repositories/user.repository.interface";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from "@nestjs/config";

export interface JwtPayload {
    sub: string;
    email: string;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepo: UserRepositoryInterface,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>("JWT_SECRET"),
        });
    }

    async validate(payload: any) {
        const user = await this.userRepo.findByEmailWithRol(payload.email);
        if (!user) {
            throw new UnauthorizedException("Usuario no encontrado");
        }
        return user;
    }
}