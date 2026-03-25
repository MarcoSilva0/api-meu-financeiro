import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Category } from 'src/category/domain/entities/category.entity';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';
import { CategoryMapper } from '../mappers/category.mapper';

@Injectable()
export class PrismaCategoryRepository extends CategoryRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(category: Category) {
    const createdCategory = await this.prisma.category.create({
      data: {
        name: category.name,
        userId: category.userId,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });

    return CategoryMapper.toDomain(createdCategory);
  }

  async findManyByUserId(userId: number) {
    const categories = await this.prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });

    return categories.map(CategoryMapper.toDomain);
  }

  async findByIdAndUserId(id: number, userId: number) {
    const category = await this.prisma.category.findFirst({
      where: { id, userId },
    });

    return category ? CategoryMapper.toDomain(category) : null;
  }

  async findByNameAndUserId(name: string, userId: number) {
    const category = await this.prisma.category.findFirst({
      where: { name, userId },
    });

    return category ? CategoryMapper.toDomain(category) : null;
  }

  async update(category: Category) {
    const updatedCategory = await this.prisma.category.update({
      where: { id: Number(category.id) },
      data: {
        name: category.name,
        updatedAt: category.updatedAt,
      },
    });

    return CategoryMapper.toDomain(updatedCategory);
  }

  async delete(id: number, userId: number): Promise<void> {
    await this.prisma.category.deleteMany({
      where: { id, userId },
    });
  }
}
