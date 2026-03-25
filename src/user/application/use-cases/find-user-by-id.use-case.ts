import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    id: string,
  ): Promise<{
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const user = await this.userRepository.findById(Number(id));
    if (!user) return null;
    return {
      id: Number(user.id),
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt || new Date(),
    };
  }
}
