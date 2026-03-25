import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { PaymentMethodRepository } from 'src/payment-method/domain/repositories/payment-method.repository';
import { PaymentMethodMapper } from '../mappers/payment-method.mapper';

@Injectable()
export class PrismaPaymentMethodRepository extends PaymentMethodRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findMany() {
    const paymentMethods = await this.prisma.paymentMethod.findMany({
      orderBy: { name: 'asc' },
    });

    return paymentMethods.map(PaymentMethodMapper.toDomain);
  }

  async findById(id: number) {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { id },
    });

    return paymentMethod ? PaymentMethodMapper.toDomain(paymentMethod) : null;
  }
}
