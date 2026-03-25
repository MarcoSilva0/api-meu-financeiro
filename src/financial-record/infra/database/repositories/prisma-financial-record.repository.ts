import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { FinancialRecord } from 'src/financial-record/domain/entities/financial-record.entity';
import { FinancialRecordRepository } from 'src/financial-record/domain/repositories/financial-record.repository';
import { FinancialRecordMapper } from '../mappers/financial-record.mapper';

@Injectable()
export class PrismaFinancialRecordRepository extends FinancialRecordRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async createMany(records: FinancialRecord[]) {
    if (records.length === 0) {
      return [];
    }

    const createdRecords = await this.prisma.$transaction(
      records.map((record) =>
        this.prisma.financialRecord.create({
          data: {
            title: record.title,
            type: record.type,
            amount: record.amount,
            description: record.description,
            installmentsTotal: record.installmentsTotal,
            installmentNumber: record.installmentNumber,
            installmentGroup: record.installmentGroup,
            installmentsPaid: record.installmentsPaid,
            date: record.date,
            expired: record.expired,
            expireAt: record.expireAt,
            paid: record.paid,
            paidAt: record.paidAt,
            categoryId: record.categoryId,
            paymentMethodId: record.paymentMethodId,
            userId: record.userId,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
          },
        }),
      ),
    );

    return createdRecords.map(FinancialRecordMapper.toDomain);
  }

  async findManyByUserId(userId: number) {
    const records = await this.prisma.financialRecord.findMany({
      where: { userId },
      orderBy: [{ date: 'desc' }, { id: 'desc' }],
    });

    return records.map(FinancialRecordMapper.toDomain);
  }

  async findByIdAndUserId(id: number, userId: number) {
    const record = await this.prisma.financialRecord.findFirst({
      where: { id, userId },
    });

    return record ? FinancialRecordMapper.toDomain(record) : null;
  }

  async update(record: FinancialRecord) {
    const updatedRecord = await this.prisma.financialRecord.update({
      where: { id: Number(record.id) },
      data: {
        title: record.title,
        type: record.type,
        amount: record.amount,
        description: record.description,
        date: record.date,
        expireAt: record.expireAt,
        categoryId: record.categoryId,
        paymentMethodId: record.paymentMethodId,
        updatedAt: record.updatedAt,
      },
    });

    return FinancialRecordMapper.toDomain(updatedRecord);
  }

  async delete(id: number, userId: number): Promise<void> {
    await this.prisma.financialRecord.deleteMany({
      where: { id, userId },
    });
  }
}
