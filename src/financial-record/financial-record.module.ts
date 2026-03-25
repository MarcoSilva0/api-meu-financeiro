import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { PaymentMethodModule } from 'src/payment-method/payment-method.module';
import { CreateFinancialRecordUseCase } from './application/use-cases/create-financial-record.use-case';
import { DeleteFinancialRecordUseCase } from './application/use-cases/delete-financial-record.use-case';
import { ListFinancialRecordsUseCase } from './application/use-cases/list-financial-records.use-case';
import { UpdateFinancialRecordUseCase } from './application/use-cases/update-financial-record.use-case';
import { FinancialRecordRepository } from './domain/repositories/financial-record.repository';
import { PrismaFinancialRecordRepository } from './infra/database/repositories/prisma-financial-record.repository';
import { FinancialRecordController } from './presentation/controllers/financial-record.controller';

@Module({
  imports: [CategoryModule, PaymentMethodModule],
  controllers: [FinancialRecordController],
  providers: [
    PrismaFinancialRecordRepository,
    {
      provide: FinancialRecordRepository,
      useClass: PrismaFinancialRecordRepository,
    },
    CreateFinancialRecordUseCase,
    ListFinancialRecordsUseCase,
    UpdateFinancialRecordUseCase,
    DeleteFinancialRecordUseCase,
  ],
  exports: [FinancialRecordRepository],
})
export class FinancialRecordModule {}
