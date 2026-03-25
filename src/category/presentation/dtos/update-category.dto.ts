import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Mercado',
    description: 'Novo nome da categoria',
  })
  @IsString()
  @MinLength(2)
  name: string;
}
