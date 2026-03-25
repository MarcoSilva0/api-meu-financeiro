import { FinancialRecord } from '../entities/financial-record.entity';

export abstract class FinancialRecordRepository {
  abstract createMany(records: FinancialRecord[]): Promise<FinancialRecord[]>;
  abstract findManyByUserId(userId: number): Promise<FinancialRecord[]>;
  abstract findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<FinancialRecord | null>;
  abstract update(record: FinancialRecord): Promise<FinancialRecord>;
  abstract delete(id: number, userId: number): Promise<void>;
}
