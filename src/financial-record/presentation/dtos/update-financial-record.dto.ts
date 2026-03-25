import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { FinancialRecordTypeDto } from './create-financial-record.dto';

export class UpdateFinancialRecordDto {
  @ApiProperty({ example: 'Parcela notebook' })
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty({ enum: FinancialRecordTypeDto, example: FinancialRecordTypeDto.EXPENSE })
  @IsEnum(FinancialRecordTypeDto)
  type: FinancialRecordTypeDto;

  @ApiProperty({ example: 350.5 })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ example: 'Compra de notebook para trabalho' })
  @IsString()
  @MinLength(2)
  description: string;

  @ApiProperty({ example: '2026-03-25T00:00:00.000Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ required: false, example: '2026-04-10T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  expireAt?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  categoryId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  paymentMethodId: number;
}
