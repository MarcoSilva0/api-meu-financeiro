import { Module } from '@nestjs/common';
import { CategoryRepository } from './domain/repositories/category.repository';
import { PrismaCategoryRepository } from './infra/database/repositories/prisma-category.repository';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { ListCategoriesUseCase } from './application/use-cases/list-categories.use-case';
import { UpdateCategoryUseCase } from './application/use-cases/update-category.use-case';
import { DeleteCategoryUseCase } from './application/use-cases/delete-category.use-case';
import { CategoryController } from './presentation/controllers/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaCategoryRepository,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
  exports: [CategoryRepository],
})
export class CategoryModule {}
