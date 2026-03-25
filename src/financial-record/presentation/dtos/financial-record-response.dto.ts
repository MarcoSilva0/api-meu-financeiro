import { ApiProperty } from '@nestjs/swagger';

export class FinancialRecordResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Parcela notebook' })
  title: string;

  @ApiProperty({ example: 'expense' })
  type: string;

  @ApiProperty({ example: 350.5 })
  amount: number;

  @ApiProperty({ example: 'Compra de notebook para trabalho' })
  description: string;

  @ApiProperty({ example: 12 })
  installmentsTotal: number;

  @ApiProperty({ example: 1 })
  installmentNumber: number;

  @ApiProperty({ example: 'f2095cb2-657f-4cc6-b214-0bf85904ca40', required: false })
  installmentGroup?: string;

  @ApiProperty({ example: '2026-03-25T00:00:00.000Z' })
  date: Date;

  @ApiProperty({ required: false, example: '2026-04-10T00:00:00.000Z' })
  expireAt?: Date;

  @ApiProperty({ example: false })
  paid: boolean;

  @ApiProperty({ required: false, example: null })
  paidAt?: Date | null;

  @ApiProperty({ example: 1 })
  categoryId: number;

  @ApiProperty({ example: 1 })
  paymentMethodId: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: '2026-03-25T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-03-25T00:00:00.000Z' })
  updatedAt: Date;
}

export class DeleteFinancialRecordResponseDto {
  @ApiProperty({ example: 'Lançamento financeiro removido com sucesso' })
  message: string;
}
