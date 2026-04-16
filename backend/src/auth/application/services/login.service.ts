import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { UserRepositoryInterface } from "../../../user/domain/repositories/user.repository.interface";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../../infrastructure/strategies/jwt.strategy';

interface LoginParams {
    email: string;
    password: string;
}

interface LoginResult {
    accessToken: string;
    userId: string;
    email: string;
    name: string;
    rolName?: string;
}


@Injectable()
export class LoginService {
    constructor(
        private readonly userRepo: UserRepositoryInterface,
        private readonly jwtService: JwtService,
    ) {}

    async execute(params: LoginParams): Promise<LoginResult> {
        const user = await this.userRepo.findByEmailWithRol(params.email);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(params.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
        }

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            userId: user.id,
            email: user.email,
            name: user.name,
            rolName: user.rol?.name,
        }
    }

}