import { ConflictException, Injectable } from '@nestjs/common';
import { Category } from 'src/category/domain/entities/category.entity';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';

interface CreateCategoryInput {
  name: string;
  userId: number;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInput) {
    const categoryAlreadyExists = await this.categoryRepository.findByNameAndUserId(
      input.name,
      input.userId,
    );

    if (categoryAlreadyExists) {
      throw new ConflictException('Categoria já cadastrada para este usuário');
    }

    const categoryToCreate = Category.create({
      name: input.name,
      userId: input.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdCategory = await this.categoryRepository.create(categoryToCreate);

    return {
      id: Number(createdCategory.id),
      name: createdCategory.name,
      userId: createdCategory.userId,
      createdAt: createdCategory.createdAt,
      updatedAt: createdCategory.updatedAt ?? new Date(),
    };
  }
}
