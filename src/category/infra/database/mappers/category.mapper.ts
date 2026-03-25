import { Category as PrismaCategory } from '@prisma/client';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';
import { Category } from 'src/category/domain/entities/category.entity';

export class CategoryMapper {
  static toDomain(prismaCategory: PrismaCategory) {
    return Category.create(
      {
        name: prismaCategory.name,
        userId: prismaCategory.userId,
        createdAt: prismaCategory.createdAt,
        updatedAt: prismaCategory.updatedAt,
      },
      new UniqueEntityId(prismaCategory.id.toString()),
    );
  }

  static toPersistence(category: Category) {
    return {
      id: Number(category.id),
      name: category.name,
      userId: category.userId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
