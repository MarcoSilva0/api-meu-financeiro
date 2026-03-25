import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User } from '../../../user/domain/entities/user.entity';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { RefreshTokenDto } from '../../presentation/dtos/refresh-token.dto';
import { RegisterDto } from '../../presentation/dtos/register.dto';

type AuthUser = {
  id: number;
  name: string;
  email: string;
  jti?: string;
};

type TokenPayload = {
  sub: number;
  email: string;
  type: 'access' | 'refresh';
  jti: string;
  tokenVersion: number;
};

@Injectable()
export class AuthService {
  private readonly refreshTokenHashes = new Map<number, string>();
  private readonly tokenVersions = new Map<number, number>();
  private readonly revokedAccessJtis = new Set<string>();

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  private getRefreshSecret() {
    return process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET;
  }

  private getRefreshExpiresIn() {
    const refreshExpiresIn = Number(process.env.JWT_REFRESH_EXPIRES_IN ?? '604800');
    return Number.isNaN(refreshExpiresIn) ? 604800 : refreshExpiresIn;
  }

  private getAccessExpiresInSeconds() {
    return Number(process.env.JWT_EXPIRES_IN ?? '3600');
  }

  private getTokenVersion(userId: number) {
    return this.tokenVersions.get(userId) ?? 0;
  }

  private incrementTokenVersion(userId: number) {
    const nextVersion = this.getTokenVersion(userId) + 1;
    this.tokenVersions.set(userId, nextVersion);
    return nextVersion;
  }

  private async issueTokens(user: AuthUser) {
    const tokenVersion = this.getTokenVersion(user.id);

    const accessPayload: TokenPayload = {
      sub: user.id,
      email: user.email,
      type: 'access',
      jti: randomUUID(),
      tokenVersion,
    };

    const refreshPayload: TokenPayload = {
      sub: user.id,
      email: user.email,
      type: 'refresh',
      jti: randomUUID(),
      tokenVersion,
    };

    const accessToken = this.jwtService.sign(accessPayload);
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.getRefreshSecret(),
      expiresIn: this.getRefreshExpiresIn(),
    });

    this.refreshTokenHashes.set(user.id, await hash(refreshToken, 10));

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: this.getAccessExpiresInSeconds(),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthUser | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      return {
        id: Number(user.id),
        name: user.name,
        email: user.email,
      };
    }

    return null;
  }

  async validateAccessTokenPayload(payload: TokenPayload): Promise<AuthUser> {
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Token inválido para este endpoint');
    }

    if (this.revokedAccessJtis.has(payload.jti)) {
      throw new UnauthorizedException('Token revogado');
    }

    if (payload.tokenVersion !== this.getTokenVersion(payload.sub)) {
      throw new UnauthorizedException('Token expirado por logout');
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      id: Number(user.id),
      name: user.name,
      email: user.email,
      jti: payload.jti,
    };
  }

  async register(data: RegisterDto) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new ConflictException('E-mail já está em uso');
    }

    const hashedPassword = await hash(data.password, 10);
    const userToCreate = User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.create(userToCreate);
    const authenticatedUser = {
      id: Number(createdUser.id),
      name: createdUser.name,
      email: createdUser.email,
    };

    return this.createSession(authenticatedUser);
  }

  async createSession(user: AuthUser) {
    return {
      user,
      ...(await this.login(user)),
    };
  }

  async login(user: AuthUser) {
    return this.issueTokens(user);
  }

  async refreshTokens(data: RefreshTokenDto) {
    let payload: TokenPayload;

    try {
      payload = this.jwtService.verify<TokenPayload>(data.refreshToken, {
        secret: this.getRefreshSecret(),
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Token inválido para refresh');
    }

    if (payload.tokenVersion !== this.getTokenVersion(payload.sub)) {
      throw new UnauthorizedException('Refresh token expirado por logout');
    }

    const storedTokenHash = this.refreshTokenHashes.get(payload.sub);
    if (!storedTokenHash) {
      throw new UnauthorizedException('Sessão não encontrada');
    }

    const isRefreshTokenValid = await compare(data.refreshToken, storedTokenHash);
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return this.createSession({
      id: Number(user.id),
      name: user.name,
      email: user.email,
    });
  }

  async logout(userId: number, accessTokenJti?: string) {
    if (accessTokenJti) {
      this.revokedAccessJtis.add(accessTokenJti);
    }

    this.refreshTokenHashes.delete(userId);
    this.incrementTokenVersion(userId);

    return {
      message: 'Sessão encerrada com sucesso',
    };
  }
}
