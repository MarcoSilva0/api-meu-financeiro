import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infra/guards/jwt-auth.guard';
import { ListPaymentMethodsUseCase } from 'src/payment-method/application/use-cases/list-payment-methods.use-case';
import { PaymentMethodResponseDto } from '../dtos/payment-method-response.dto';

@ApiTags('PaymentMethod')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Token JWT inválido' })
@UseGuards(JwtAuthGuard)
@Controller('payment-methods')
export class PaymentMethodController {
  constructor(
    private readonly listPaymentMethodsUseCase: ListPaymentMethodsUseCase,
  ) {}

  @ApiOperation({ summary: 'Listar formas de pagamento' })
  @ApiOkResponse({ type: PaymentMethodResponseDto, isArray: true })
  @Get()
  async list() {
    return this.listPaymentMethodsUseCase.execute();
  }
}
