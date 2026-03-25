import { FinancialRecord as PrismaFinancialRecord } from '@prisma/client';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';
import {
  FinancialRecord,
  FinancialRecordType,
} from 'src/financial-record/domain/entities/financial-record.entity';

export class FinancialRecordMapper {
  static toDomain(prismaFinancialRecord: PrismaFinancialRecord) {
    return FinancialRecord.create(
      {
        title: prismaFinancialRecord.title,
        type: prismaFinancialRecord.type as FinancialRecordType,
        amount: prismaFinancialRecord.amount,
        description: prismaFinancialRecord.description,
        installmentsTotal: prismaFinancialRecord.installmentsTotal,
        installmentNumber: prismaFinancialRecord.installmentNumber,
        installmentGroup: prismaFinancialRecord.installmentGroup,
        installmentsPaid: prismaFinancialRecord.installmentsPaid,
        date: prismaFinancialRecord.date,
        expired: prismaFinancialRecord.expired,
        expireAt: prismaFinancialRecord.expireAt,
        paid: prismaFinancialRecord.paid,
        paidAt: prismaFinancialRecord.paidAt,
        categoryId: prismaFinancialRecord.categoryId,
        paymentMethodId: prismaFinancialRecord.paymentMethodId,
        userId: prismaFinancialRecord.userId,
        createdAt: prismaFinancialRecord.createdAt,
        updatedAt: prismaFinancialRecord.updatedAt,
      },
      new UniqueEntityId(prismaFinancialRecord.id.toString()),
    );
  }
}
