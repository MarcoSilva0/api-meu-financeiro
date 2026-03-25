import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './shared/database/database.module';
import { envSchema } from './shared/config/env';
import { EnvConfigModule } from './shared/config/config.module';
import { CategoryModule } from './category/category.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { FinancialRecordModule } from './financial-record/financial-record.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
      cache: true,
    }),
    EnvConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    CategoryModule,
    PaymentMethodModule,
    FinancialRecordModule,
  ],
})
export class AppModule {}
