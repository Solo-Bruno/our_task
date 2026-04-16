import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthResponse } from '../types/auth-response.type';
import { LoginInput } from '../dto/login.input';
import { LoginService } from '../../../application/services/login.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { RegisterInput } from '../dto/register.input';
import { RegisterService } from '../../../application/services/registrer.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService   
) {}

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    return this.loginService.execute(input);
  }

  @Query(() => AuthResponse, {name: 'me'})
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: any): Promise<AuthResponse> {
    return {
      accessToken: '', 
      userId: user.id,
      email: user.email,
      name: user.name,
      rolName: user.rol?.name,
    };
  }

@Mutation(() => AuthResponse)
async register(@Args('input') input: RegisterInput): Promise<AuthResponse> {
  return this.registerService.execute(input);
}
}
