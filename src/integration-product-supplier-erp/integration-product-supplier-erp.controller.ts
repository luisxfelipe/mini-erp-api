import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IntegrationProductSupplierErpService } from './integration-product-supplier-erp.service';
import { CreateIntegrationProductSupplierErpDto } from './dto/create-integration-product-supplier-erp.dto';
import { UpdateIntegrationProductSupplierErpDto } from './dto/update-integration-product-supplier-erp.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReturnIntegrationProductSupplierErpDto } from './dto/return-integration-product-supplier-erp.dto';
import { PaginationDto, PaginationMetaDto } from 'src/dtos/pagination.dto';
import { PaginationIntegrationProductSupplierErpDto } from './dto/pagination-integration-product-supplier-erp.dto';

@Controller('integration-product-supplier-erp')
@ApiTags('Integration Product Supplier Erp')
export class IntegrationProductSupplierErpController {
  constructor(
    private readonly integrationProductSupplierErpsService: IntegrationProductSupplierErpService,
  ) { }

  @Post()
  async create(
    @Body()
    createIntegrationProductSupplierErpDto: CreateIntegrationProductSupplierErpDto,
  ): Promise<ReturnIntegrationProductSupplierErpDto> {
    return new ReturnIntegrationProductSupplierErpDto(
      await this.integrationProductSupplierErpsService.create(
        createIntegrationProductSupplierErpDto,
      ),
    );
  }

  @Get()
  async findAll(): Promise<ReturnIntegrationProductSupplierErpDto[]> {
    return (await this.integrationProductSupplierErpsService.findAll()).map(
      (integrationProductSupplierErp) =>
        new ReturnIntegrationProductSupplierErpDto(
          integrationProductSupplierErp,
        ),
    );
  }

  @Get('/pages')
  @ApiQuery({ name: 'search', required: false, description: 'Termo de busca para filtrar integrações por nome do produto' })
  @ApiQuery({ name: 'take', required: false, description: 'Quantidade de itens por página' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de integrações produto-fornecedor-erp',
    type: PaginationIntegrationProductSupplierErpDto
  })
  async findAllWithPagination(
    @Query('search') search?: string,
    @Query('take') take?: number,
    @Query('page') page?: number,
  ): Promise<PaginationDto<ReturnIntegrationProductSupplierErpDto>> {
    const productsPaginated =
      await this.integrationProductSupplierErpsService.findAllWithPagination(
        search,
        take,
        page,
      );

    return new PaginationDto<ReturnIntegrationProductSupplierErpDto>(
      new PaginationMetaDto(
        Number(take),
        productsPaginated.total,
        Number(page),
        Math.ceil(productsPaginated.total / take),
      ),
      productsPaginated.data.map(
        (integration) =>
          new ReturnIntegrationProductSupplierErpDto(integration),
      ),
    );
  }

  @Get('by-supplier/:supplierId')
  async findBySupplierId(
    @Param('supplierId') supplierId: string,
  ): Promise<ReturnIntegrationProductSupplierErpDto[]> {
    return (
      await this.integrationProductSupplierErpsService.findBySupplierId(
        +supplierId,
      )
    ).map(
      (integrationProductSupplierErp) =>
        new ReturnIntegrationProductSupplierErpDto(
          integrationProductSupplierErp,
        ),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ReturnIntegrationProductSupplierErpDto> {
    return new ReturnIntegrationProductSupplierErpDto(
      await this.integrationProductSupplierErpsService.findOne(+id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateIntegrationProductSupplierErpDto: UpdateIntegrationProductSupplierErpDto,
  ): Promise<ReturnIntegrationProductSupplierErpDto> {
    return new ReturnIntegrationProductSupplierErpDto(
      await this.integrationProductSupplierErpsService.update(
        +id,
        updateIntegrationProductSupplierErpDto,
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ReturnIntegrationProductSupplierErpDto> {
    return new ReturnIntegrationProductSupplierErpDto(
      await this.integrationProductSupplierErpsService.remove(id),
    )
  }

  @Post(':id/restore')
  async restore(@Param('id', ParseIntPipe) id: number): Promise<ReturnIntegrationProductSupplierErpDto> {
    return new ReturnIntegrationProductSupplierErpDto(
      await this.integrationProductSupplierErpsService.restore(id),
    )
  }
}
