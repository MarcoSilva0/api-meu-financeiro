import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from '../../infra/services/auth.service';
import { JwtAuthGuard } from '../../infra/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../infra/guards/local-auth.guard';
import {
  AuthSessionDto,
  LogoutResponseDto,
  MeResponseDto,
} from '../dtos/auth-response.dto';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RegisterDto } from '../dtos/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: AuthSessionDto })
  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @ApiOperation({ summary: 'Autenticar usuário com e-mail e senha' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthSessionDto })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UseGuards(ThrottlerGuard, LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() _loginDto: LoginDto) {
    return this.authService.createSession(req.user);
  }

  @ApiOperation({ summary: 'Renovar sessão com refresh token (rotação)' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ type: AuthSessionDto })
  @ApiUnauthorizedResponse({ description: 'Refresh token inválido ou expirado' })
  @Post('refresh')
  async refresh(@Body() data: RefreshTokenDto) {
    return this.authService.refreshTokens(data);
  }

  @ApiOperation({ summary: 'Retornar usuário autenticado' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: MeResponseDto })
  @ApiUnauthorizedResponse({ description: 'Token JWT inválido' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return { user: req.user };
  }

  @ApiOperation({ summary: 'Encerrar sessão e invalidar tokens ativos' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: LogoutResponseDto })
  @ApiUnauthorizedResponse({ description: 'Token JWT inválido' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user.id, req.user.jti);
  }
}
