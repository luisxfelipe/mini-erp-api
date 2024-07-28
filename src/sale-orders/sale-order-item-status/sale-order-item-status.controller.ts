import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SaleOrderItemStatusService } from './sale-order-item-status.service';
import { CreateSaleOrderItemStatusDto } from './dto/create-sale-order-item-status.dto';
import { UpdateSaleOrderItemStatusDto } from './dto/update-sale-order-item-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnSaleOrderItemStatusDto } from './dto/return-sale-order-item-status';

@Controller('sale-order-item-status')
@ApiTags('Sale order item status')
export class SaleOrderItemStatusController {
  constructor(
    private readonly saleOrderItemStatusService: SaleOrderItemStatusService,
  ) {}

  @Post()
  async create(
    @Body() createSaleOrderItemStatusDto: CreateSaleOrderItemStatusDto,
  ): Promise<ReturnSaleOrderItemStatusDto> {
    return new ReturnSaleOrderItemStatusDto(
      await this.saleOrderItemStatusService.create(
        createSaleOrderItemStatusDto,
      ),
    );
  }

  @Get()
  async findAll(): Promise<ReturnSaleOrderItemStatusDto[]> {
    return (await this.saleOrderItemStatusService.findAll()).map(
      (status) => new ReturnSaleOrderItemStatusDto(status),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnSaleOrderItemStatusDto> {
    return new ReturnSaleOrderItemStatusDto(
      await this.saleOrderItemStatusService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleOrderItemStatusDto: UpdateSaleOrderItemStatusDto,
  ): Promise<ReturnSaleOrderItemStatusDto> {
    return new ReturnSaleOrderItemStatusDto(
      await this.saleOrderItemStatusService.update(
        id,
        updateSaleOrderItemStatusDto,
      ),
    );
  }
}
