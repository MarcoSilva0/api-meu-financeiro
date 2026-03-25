import { Entity } from 'src/shared/entities/entity';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';

interface PaymentMethodProps {
  name: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class PaymentMethod extends Entity<PaymentMethodProps> {
  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: PaymentMethodProps, id?: UniqueEntityId) {
    return new PaymentMethod(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
  }
}
