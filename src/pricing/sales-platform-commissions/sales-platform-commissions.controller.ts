import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesPlatformCommissionsService } from './sales-platform-commissions.service';
import { CreateSalesPlatformCommissionDto } from './dto/create-sales-platform-commission.dto';
import { UpdateSalesPlatformCommissionDto } from './dto/update-sales-platform-commission.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnSalePlatformCommissionDto } from './dto/return-sale-platform-commission.dto';

@Controller('sales-platform-commissions')
@ApiTags('Sales Platform Commissions')
export class SalesPlatformCommissionsController {
  constructor(
    private readonly salesPlatformCommissionsService: SalesPlatformCommissionsService,
  ) {}

  @Post()
  async create(
    @Body() createSalesPlatformCommissionDto: CreateSalesPlatformCommissionDto,
  ): Promise<ReturnSalePlatformCommissionDto> {
    const salesPlatformCommission =
      await this.salesPlatformCommissionsService.create(
        createSalesPlatformCommissionDto,
      );
    return new ReturnSalePlatformCommissionDto(salesPlatformCommission);
  }

  @Get()
  async findAll(): Promise<ReturnSalePlatformCommissionDto[]> {
    return (await this.salesPlatformCommissionsService.findAll()).map(
      (salesPlatformCommission) =>
        new ReturnSalePlatformCommissionDto(salesPlatformCommission),
    );
  }

  @Get('by-platform/:platformId')
  async findByPlatformId(
    @Param('platformId') platformId: string,
  ): Promise<ReturnSalePlatformCommissionDto> {
    return new ReturnSalePlatformCommissionDto(
      await this.salesPlatformCommissionsService.findOneByPlatformId(
        +platformId,
      ),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ReturnSalePlatformCommissionDto> {
    return new ReturnSalePlatformCommissionDto(
      await this.salesPlatformCommissionsService.findOne(+id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSalesPlatformCommissionDto: UpdateSalesPlatformCommissionDto,
  ): Promise<ReturnSalePlatformCommissionDto> {
    return new ReturnSalePlatformCommissionDto(
      await this.salesPlatformCommissionsService.update(
        +id,
        updateSalesPlatformCommissionDto,
      ),
    );
  }
}
