import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infra/guards/jwt-auth.guard';
import { CreateFinancialRecordUseCase } from 'src/financial-record/application/use-cases/create-financial-record.use-case';
import { DeleteFinancialRecordUseCase } from 'src/financial-record/application/use-cases/delete-financial-record.use-case';
import { ListFinancialRecordsUseCase } from 'src/financial-record/application/use-cases/list-financial-records.use-case';
import { UpdateFinancialRecordUseCase } from 'src/financial-record/application/use-cases/update-financial-record.use-case';
import { CreateFinancialRecordDto } from '../dtos/create-financial-record.dto';
import {
  DeleteFinancialRecordResponseDto,
  FinancialRecordResponseDto,
} from '../dtos/financial-record-response.dto';
import { UpdateFinancialRecordDto } from '../dtos/update-financial-record.dto';

@ApiTags('FinancialRecord')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Token JWT inválido' })
@UseGuards(JwtAuthGuard)
@Controller('financial-records')
export class FinancialRecordController {
  constructor(
    private readonly createFinancialRecordUseCase: CreateFinancialRecordUseCase,
    private readonly listFinancialRecordsUseCase: ListFinancialRecordsUseCase,
    private readonly updateFinancialRecordUseCase: UpdateFinancialRecordUseCase,
    private readonly deleteFinancialRecordUseCase: DeleteFinancialRecordUseCase,
  ) {}

  @ApiOperation({
    summary:
      'Criar lançamento financeiro (com geração automática de parcelas nos meses seguintes)',
  })
  @ApiBody({ type: CreateFinancialRecordDto })
  @ApiCreatedResponse({ type: FinancialRecordResponseDto, isArray: true })
  @Post()
  async create(@Request() req, @Body() data: CreateFinancialRecordDto) {
    return this.createFinancialRecordUseCase.execute({
      title: data.title,
      type: data.type,
      amount: data.amount,
      description: data.description,
      installmentsTotal: data.installmentsTotal,
      date: new Date(data.date),
      expireAt: data.expireAt ? new Date(data.expireAt) : undefined,
      categoryId: data.categoryId,
      paymentMethodId: data.paymentMethodId,
      userId: req.user.id,
    });
  }

  @ApiOperation({ summary: 'Listar lançamentos do usuário autenticado' })
  @ApiOkResponse({ type: FinancialRecordResponseDto, isArray: true })
  @Get()
  async list(@Request() req) {
    return this.listFinancialRecordsUseCase.execute(req.user.id);
  }

  @ApiOperation({ summary: 'Atualizar um lançamento do usuário autenticado' })
  @ApiBody({ type: UpdateFinancialRecordDto })
  @ApiOkResponse({ type: FinancialRecordResponseDto })
  @Put(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFinancialRecordDto,
  ) {
    return this.updateFinancialRecordUseCase.execute({
      id,
      userId: req.user.id,
      title: data.title,
      type: data.type,
      amount: data.amount,
      description: data.description,
      date: new Date(data.date),
      expireAt: data.expireAt ? new Date(data.expireAt) : undefined,
      categoryId: data.categoryId,
      paymentMethodId: data.paymentMethodId,
    });
  }

  @ApiOperation({ summary: 'Excluir um lançamento do usuário autenticado' })
  @ApiOkResponse({ type: DeleteFinancialRecordResponseDto })
  @Delete(':id')
  async delete(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.deleteFinancialRecordUseCase.execute(id, req.user.id);
  }
}
