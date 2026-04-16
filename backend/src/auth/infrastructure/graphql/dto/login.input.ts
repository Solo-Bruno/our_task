import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
 
@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;
 
  @Field()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
 