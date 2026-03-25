import { Module } from '@nestjs/common';
import { ListPaymentMethodsUseCase } from './application/use-cases/list-payment-methods.use-case';
import { PaymentMethodRepository } from './domain/repositories/payment-method.repository';
import { PrismaPaymentMethodRepository } from './infra/database/repositories/prisma-payment-method.repository';
import { PaymentMethodController } from './presentation/controllers/payment-method.controller';

@Module({
  controllers: [PaymentMethodController],
  providers: [
    PrismaPaymentMethodRepository,
    {
      provide: PaymentMethodRepository,
      useClass: PrismaPaymentMethodRepository,
    },
    ListPaymentMethodsUseCase,
  ],
  exports: [PaymentMethodRepository],
})
export class PaymentMethodModule {}
