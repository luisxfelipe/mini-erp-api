import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SalesOrdersService } from './sales-orders.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnSaleOrderDto } from './dto/return-sale-order.dto';

@Controller('sales-orders')
@ApiTags('Sales orders')
export class SalesOrdersController {
  constructor(private readonly salesOrdersService: SalesOrdersService) {}

  @Post()
  async create(
    @Body() createSalesOrderDto: CreateSalesOrderDto,
  ): Promise<ReturnSaleOrderDto> {
    return new ReturnSaleOrderDto(
      await this.salesOrdersService.create(createSalesOrderDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnSaleOrderDto[]> {
    return (await this.salesOrdersService.findAll(true)).map(
      (saleOrder) => new ReturnSaleOrderDto(saleOrder),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnSaleOrderDto> {
    console.log(`id: ${id}`);
    return new ReturnSaleOrderDto(
      await this.salesOrdersService.findOne(id, true),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSalesOrderDto: UpdateSalesOrderDto,
  ): Promise<ReturnSaleOrderDto> {
    return new ReturnSaleOrderDto(
      await this.salesOrdersService.update(id, updateSalesOrderDto),
    );
  }
}
