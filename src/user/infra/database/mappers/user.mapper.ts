import { User as PrismaUser } from '@prisma/client';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';
import { User } from 'src/user/domain/entities/user.entity';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser) {
    return User.create(
      {
        name: prismaUser.name,
        email: prismaUser.email,
        password: prismaUser.password,
        createdAt: prismaUser.createdAt,
        updatedAt: prismaUser.updatedAt,
      },
      new UniqueEntityId(prismaUser.id.toString()),
    );
  }

  static toPersistence(user: User) {
    return {
      id: Number(user.id),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
