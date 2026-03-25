import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';
import {
  FinancialRecord,
  FinancialRecordType,
} from 'src/financial-record/domain/entities/financial-record.entity';
import { FinancialRecordRepository } from 'src/financial-record/domain/repositories/financial-record.repository';
import { PaymentMethodRepository } from 'src/payment-method/domain/repositories/payment-method.repository';

interface UpdateFinancialRecordInput {
  id: number;
  userId: number;
  title: string;
  type: FinancialRecordType;
  amount: number;
  description: string;
  date: Date;
  expireAt?: Date;
  categoryId: number;
  paymentMethodId: number;
}

@Injectable()
export class UpdateFinancialRecordUseCase {
  constructor(
    private readonly financialRecordRepository: FinancialRecordRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ) {}

  async execute(input: UpdateFinancialRecordInput) {
    const record = await this.financialRecordRepository.findByIdAndUserId(
      input.id,
      input.userId,
    );

    if (!record) {
      throw new NotFoundException('Lançamento financeiro não encontrado');
    }

    const category = await this.categoryRepository.findByIdAndUserId(
      input.categoryId,
      input.userId,
    );

    if (!category) {
      throw new NotFoundException('Categoria não encontrada para este usuário');
    }

    const paymentMethod = await this.paymentMethodRepository.findById(
      input.paymentMethodId,
    );

    if (!paymentMethod) {
      throw new NotFoundException('Forma de pagamento não encontrada');
    }

    const recordToUpdate = FinancialRecord.create(
      {
        title: input.title,
        type: input.type,
        amount: input.amount,
        description: input.description,
        installmentsTotal: record.installmentsTotal,
        installmentNumber: record.installmentNumber,
        installmentGroup: record.installmentGroup,
        installmentsPaid: record.installmentsPaid,
        date: input.date,
        expired: record.expired,
        expireAt: input.expireAt,
        paid: record.paid,
        paidAt: record.paidAt,
        categoryId: input.categoryId,
        paymentMethodId: input.paymentMethodId,
        userId: input.userId,
        createdAt: record.createdAt,
        updatedAt: new Date(),
      },
      new UniqueEntityId(record.id),
    );

    const updatedRecord = await this.financialRecordRepository.update(recordToUpdate);

    return {
      id: Number(updatedRecord.id),
      title: updatedRecord.title,
      type: updatedRecord.type,
      amount: updatedRecord.amount,
      description: updatedRecord.description,
      installmentsTotal: updatedRecord.installmentsTotal,
      installmentNumber: updatedRecord.installmentNumber,
      installmentGroup: updatedRecord.installmentGroup,
      date: updatedRecord.date,
      expireAt: updatedRecord.expireAt,
      paid: updatedRecord.paid,
      paidAt: updatedRecord.paidAt,
      categoryId: updatedRecord.categoryId,
      paymentMethodId: updatedRecord.paymentMethodId,
      userId: updatedRecord.userId,
      createdAt: updatedRecord.createdAt,
      updatedAt: updatedRecord.updatedAt ?? new Date(),
    };
  }
}
