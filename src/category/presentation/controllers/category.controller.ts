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
import { CreateCategoryUseCase } from 'src/category/application/use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/category/application/use-cases/delete-category.use-case';
import { ListCategoriesUseCase } from 'src/category/application/use-cases/list-categories.use-case';
import { UpdateCategoryUseCase } from 'src/category/application/use-cases/update-category.use-case';
import {
  CategoryResponseDto,
  DeleteCategoryResponseDto,
} from '../dtos/category-response.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@ApiTags('Category')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Token JWT inválido' })
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @ApiOperation({ summary: 'Criar categoria' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({ type: CategoryResponseDto })
  @Post()
  async create(@Request() req, @Body() data: CreateCategoryDto) {
    return this.createCategoryUseCase.execute({
      name: data.name,
      userId: req.user.id,
    });
  }

  @ApiOperation({
    summary: 'Listar categorias do usuário autenticado',
  })
  @ApiOkResponse({ type: CategoryResponseDto, isArray: true })
  @Get()
  async list(@Request() req) {
    return this.listCategoriesUseCase.execute(req.user.id);
  }

  @ApiOperation({ summary: 'Atualizar categoria do usuário autenticado' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({ type: CategoryResponseDto })
  @Put(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.updateCategoryUseCase.execute({
      id,
      name: data.name,
      userId: req.user.id,
    });
  }

  @ApiOperation({ summary: 'Excluir categoria do usuário autenticado' })
  @ApiOkResponse({ type: DeleteCategoryResponseDto })
  @Delete(':id')
  async delete(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.deleteCategoryUseCase.execute(id, req.user.id);
  }
}
