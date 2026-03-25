import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';

@Injectable()
export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(userId: number) {
    const categories = await this.categoryRepository.findManyByUserId(userId);

    return categories.map((category) => ({
      id: Number(category.id),
      name: category.name,
      userId: category.userId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt ?? new Date(),
    }));
  }
}
