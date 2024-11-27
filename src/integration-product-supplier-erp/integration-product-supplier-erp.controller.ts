import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { IntegrationProductSupplierErpService } from './integration-product-supplier-erp.service';
import { CreateIntegrationProductSupplierErpDto } from './dto/create-integration-product-supplier-erp.dto';
import { UpdateIntegrationProductSupplierErpDto } from './dto/update-integration-product-supplier-erp.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnIntegrationProductSupplierErpDto } from './dto/return-integration-product-supplier-erp.dto';
import { PaginationDto, PaginationMetaDto } from 'src/dtos/pagination.dto';

@Controller('integration-product-supplier-erp')
@ApiTags('Integration Product Supplier Erp')
export class IntegrationProductSupplierErpController {
  constructor(
    private readonly integrationProductSupplierErpsService: IntegrationProductSupplierErpService,
  ) {}

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
  async findAllWithPagination(
    @Query('search') search?: string,
    @Query('take') take?: number,
    @Query('page') page?: number,
  ): Promise<PaginationDto<ReturnIntegrationProductSupplierErpDto[]>> {
    const productsPaginated =
      await this.integrationProductSupplierErpsService.findAllWithPagination(
        search,
        take,
        page,
      );

    return new PaginationDto(
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
}
