import { Module } from '@nestjs/common';
import { AuthService } from './infra/services/auth.service';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/shared/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { EnvConfigModule } from 'src/shared/config/config.module';
import { EnvService } from 'src/shared/config/env.service';
import { LocalStrategy } from './infra/strategies/local.strategy';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        secret: envService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(envService.get('JWT_EXPIRES_IN')),
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
