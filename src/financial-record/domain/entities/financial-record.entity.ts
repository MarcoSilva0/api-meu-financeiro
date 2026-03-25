import { Entity } from 'src/shared/entities/entity';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';

export type FinancialRecordType = 'income' | 'expense';

interface FinancialRecordProps {
  title: string;
  type: FinancialRecordType;
  amount: number;
  description: string;
  installmentsTotal: number;
  installmentNumber: number;
  installmentGroup?: string | null;
  installmentsPaid: number;
  date: Date;
  expired: boolean;
  expireAt?: Date | null;
  paid: boolean;
  paidAt?: Date | null;
  categoryId: number;
  paymentMethodId: number;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class FinancialRecord extends Entity<FinancialRecordProps> {
  get title() {
    return this.props.title;
  }

  get type() {
    return this.props.type;
  }

  get amount() {
    return this.props.amount;
  }

  get description() {
    return this.props.description;
  }

  get installmentsTotal() {
    return this.props.installmentsTotal;
  }

  get installmentNumber() {
    return this.props.installmentNumber;
  }

  get installmentGroup() {
    return this.props.installmentGroup;
  }

  get installmentsPaid() {
    return this.props.installmentsPaid;
  }

  get date() {
    return this.props.date;
  }

  get expired() {
    return this.props.expired;
  }

  get expireAt() {
    return this.props.expireAt;
  }

  get paid() {
    return this.props.paid;
  }

  get paidAt() {
    return this.props.paidAt;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  get paymentMethodId() {
    return this.props.paymentMethodId;
  }

  get userId() {
    return this.props.userId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: FinancialRecordProps, id?: UniqueEntityId) {
    return new FinancialRecord(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
  }
}
