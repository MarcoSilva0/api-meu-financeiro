import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';
import {
  FinancialRecord,
  FinancialRecordType,
} from 'src/financial-record/domain/entities/financial-record.entity';
import { FinancialRecordRepository } from 'src/financial-record/domain/repositories/financial-record.repository';
import { PaymentMethodRepository } from 'src/payment-method/domain/repositories/payment-method.repository';

interface CreateFinancialRecordInput {
  title: string;
  type: FinancialRecordType;
  amount: number;
  description: string;
  installmentsTotal: number;
  date: Date;
  expireAt?: Date;
  categoryId: number;
  paymentMethodId: number;
  userId: number;
}

@Injectable()
export class CreateFinancialRecordUseCase {
  constructor(
    private readonly financialRecordRepository: FinancialRecordRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ) {}

  async execute(input: CreateFinancialRecordInput) {
    if (input.installmentsTotal < 1) {
      throw new BadRequestException('O número de parcelas deve ser no mínimo 1');
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

    const installmentGroup =
      input.installmentsTotal > 1 ? randomUUID() : null;

    const recordsToCreate = Array.from({ length: input.installmentsTotal }).map(
      (_, index) => {
        const installmentDate = new Date(input.date);
        installmentDate.setMonth(installmentDate.getMonth() + index);

        return FinancialRecord.create({
          title: input.title,
          type: input.type,
          amount: input.amount,
          description: input.description,
          installmentsTotal: input.installmentsTotal,
          installmentNumber: index + 1,
          installmentGroup,
          installmentsPaid: 0,
          date: installmentDate,
          expired: false,
          expireAt: input.expireAt,
          paid: false,
          paidAt: null,
          categoryId: input.categoryId,
          paymentMethodId: input.paymentMethodId,
          userId: input.userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      },
    );

    const createdRecords =
      await this.financialRecordRepository.createMany(recordsToCreate);

    return createdRecords.map((record) => ({
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
