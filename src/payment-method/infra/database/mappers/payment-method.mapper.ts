import { PaymentMethod as PrismaPaymentMethod } from '@prisma/client';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';
import { PaymentMethod } from 'src/payment-method/domain/entities/payment-method.entity';

export class PaymentMethodMapper {
  static toDomain(prismaPaymentMethod: PrismaPaymentMethod) {
    return PaymentMethod.create(
      {
        name: prismaPaymentMethod.name,
        createdAt: prismaPaymentMethod.createdAt,
        updatedAt: prismaPaymentMethod.updatedAt,
      },
      new UniqueEntityId(prismaPaymentMethod.id.toString()),
    );
  }
}
