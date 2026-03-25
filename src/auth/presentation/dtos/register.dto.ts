import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Marcos Silva',
    description: 'Nome completo do usuário',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'marcos@email.com',
    description: 'E-mail único do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Forte@123',
    description:
      'Senha forte: mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, {
    message:
      'A senha deve conter ao menos uma letra minúscula, uma maiúscula, um número e um símbolo',
  })
  password: string;
}
