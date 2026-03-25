import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Alimentação' })
  name: string;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: '2026-03-25T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-03-25T10:00:00.000Z' })
  updatedAt: Date;
}

export class DeleteCategoryResponseDto {
  @ApiProperty({ example: 'Categoria removida com sucesso' })
  message: string;
}
