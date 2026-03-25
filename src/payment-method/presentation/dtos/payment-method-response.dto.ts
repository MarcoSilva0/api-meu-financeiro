import { ApiProperty } from '@nestjs/swagger';

export class PaymentMethodResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Cartão de crédito' })
  name: string;

  @ApiProperty({ example: '2026-03-25T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-03-25T10:00:00.000Z' })
  updatedAt: Date;
}
