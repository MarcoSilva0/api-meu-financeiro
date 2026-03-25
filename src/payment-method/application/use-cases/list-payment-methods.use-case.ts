import { Injectable } from '@nestjs/common';
import { PaymentMethodRepository } from 'src/payment-method/domain/repositories/payment-method.repository';

@Injectable()
export class ListPaymentMethodsUseCase {
  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ) {}

  async execute() {
    const paymentMethods = await this.paymentMethodRepository.findMany();

    return paymentMethods.map((paymentMethod) => ({
      id: Number(paymentMethod.id),
      name: paymentMethod.name,
      createdAt: paymentMethod.createdAt,
      updatedAt: paymentMethod.updatedAt ?? new Date(),
    }));
  }
}
