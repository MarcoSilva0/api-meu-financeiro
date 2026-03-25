import { Injectable } from '@nestjs/common';
import { FinancialRecordRepository } from 'src/financial-record/domain/repositories/financial-record.repository';

@Injectable()
export class ListFinancialRecordsUseCase {
  constructor(
    private readonly financialRecordRepository: FinancialRecordRepository,
  ) {}

  async execute(userId: number) {
    const records = await this.financialRecordRepository.findManyByUserId(userId);

    return records.map((record) => ({
      id: Number(record.id),
      title: record.title,
      type: record.type,
      amount: record.amount,
      description: record.description,
      installmentsTotal: record.installmentsTotal,
      installmentNumber: record.installmentNumber,
      installmentGroup: record.installmentGroup,
      date: record.date,
      expireAt: record.expireAt,
      paid: record.paid,
      paidAt: record.paidAt,
      categoryId: record.categoryId,
      paymentMethodId: record.paymentMethodId,
      userId: record.userId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt ?? new Date(),
    }));
  }
}
