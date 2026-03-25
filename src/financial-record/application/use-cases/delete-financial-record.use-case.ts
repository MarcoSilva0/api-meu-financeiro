import { Injectable, NotFoundException } from '@nestjs/common';
import { FinancialRecordRepository } from 'src/financial-record/domain/repositories/financial-record.repository';

@Injectable()
export class DeleteFinancialRecordUseCase {
  constructor(
    private readonly financialRecordRepository: FinancialRecordRepository,
  ) {}

  async execute(id: number, userId: number) {
    const record = await this.financialRecordRepository.findByIdAndUserId(
      id,
      userId,
    );

    if (!record) {
      throw new NotFoundException('Lançamento financeiro não encontrado');
    }

    await this.financialRecordRepository.delete(id, userId);

    return {
      message: 'Lançamento financeiro removido com sucesso',
    };
  }
}
