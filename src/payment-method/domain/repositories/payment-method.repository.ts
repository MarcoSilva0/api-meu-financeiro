import { PaymentMethod } from '../entities/payment-method.entity';

export abstract class PaymentMethodRepository {
  abstract findMany(): Promise<PaymentMethod[]>;
  abstract findById(id: number): Promise<PaymentMethod | null>;
}
