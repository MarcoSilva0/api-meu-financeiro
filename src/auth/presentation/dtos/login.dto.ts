import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'marcos@email.com',
    description: 'E-mail de acesso',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Forte@123',
    description: 'Senha de acesso',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
