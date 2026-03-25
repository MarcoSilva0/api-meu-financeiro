import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';
import { Category } from 'src/category/domain/entities/category.entity';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';

interface UpdateCategoryInput {
  id: number;
  userId: number;
  name: string;
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: UpdateCategoryInput) {
    const category = await this.categoryRepository.findByIdAndUserId(
      input.id,
      input.userId,
    );

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    if (category.name !== input.name) {
      const categoryWithSameName =
        await this.categoryRepository.findByNameAndUserId(input.name, input.userId);

      if (categoryWithSameName) {
        throw new ConflictException('Categoria já cadastrada para este usuário');
      }
    }

    const categoryToUpdate = Category.create(
      {
        name: input.name,
        userId: category.userId,
        createdAt: category.createdAt,
        updatedAt: new Date(),
      },
      new UniqueEntityId(category.id),
    );

    const updatedCategory = await this.categoryRepository.update(categoryToUpdate);

    return {
      id: Number(updatedCategory.id),
      name: updatedCategory.name,
      userId: updatedCategory.userId,
      createdAt: updatedCategory.createdAt,
      updatedAt: updatedCategory.updatedAt ?? new Date(),
    };
  }
}
