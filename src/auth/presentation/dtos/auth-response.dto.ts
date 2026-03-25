import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Marcos Silva' })
  name: string;

  @ApiProperty({ example: 'marcos@email.com' })
  email: string;
}

export class AuthTokensDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access.payload.signature',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh.payload.signature',
  })
  refreshToken: string;

  @ApiProperty({ example: 'Bearer' })
  tokenType: string;

  @ApiProperty({ example: 3600 })
  expiresIn: number;
}

export class AuthSessionDto extends AuthTokensDto {
  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}

export class MeResponseDto {
  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}

export class LogoutResponseDto {
  @ApiProperty({
    example: 'Sessão encerrada com sucesso',
  })
  message: string;
}
