import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number, userId: number) {
    const category = await this.categoryRepository.findByIdAndUserId(id, userId);

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    await this.categoryRepository.delete(id, userId);

    return {
      message: 'Categoria removida com sucesso',
    };
  }
}
