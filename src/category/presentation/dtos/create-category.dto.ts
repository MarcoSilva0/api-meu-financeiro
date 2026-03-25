import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Alimentação',
    description: 'Nome da categoria',
  })
  @IsString()
  @MinLength(2)
  name: string;
}
