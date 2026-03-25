import { Module } from '@nestjs/common';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infra/database/repositories/prisma-user.repository';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';

@Module({
  providers: [
    PrismaUserRepository,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    FindUserByIdUseCase,
  ],
  exports: [UserRepository],
})
export class UserModule {}
