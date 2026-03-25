import { Category } from '../entities/category.entity';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<Category>;
  abstract findManyByUserId(userId: number): Promise<Category[]>;
  abstract findByIdAndUserId(id: number, userId: number): Promise<Category | null>;
  abstract findByNameAndUserId(
    name: string,
    userId: number,
  ): Promise<Category | null>;
  abstract update(category: Category): Promise<Category>;
  abstract delete(id: number, userId: number): Promise<void>;
}
