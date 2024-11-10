import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateSaleOrderDto } from './dto/create-sales-order.dto';
import { UpdateSaleOrderDto } from './dto/update-sale-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnSaleOrderDto } from './dto/return-sale-order.dto';
import { SaleOrdersService } from './sale-orders.service';

@Controller('sales-orders')
@ApiTags('Sales orders')
export class SaleOrdersController {
  constructor(private readonly saleOrdersService: SaleOrdersService) {}

  @Post()
  async create(
    @Body() createSaleOrderDto: CreateSaleOrderDto,
  ): Promise<ReturnSaleOrderDto> {
    return new ReturnSaleOrderDto(
      await this.saleOrdersService.create(createSaleOrderDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnSaleOrderDto[]> {
    return (await this.saleOrdersService.findAll(true)).map(
      (saleOrder) => new ReturnSaleOrderDto(saleOrder),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnSaleOrderDto> {
    return new ReturnSaleOrderDto(
      await this.saleOrdersService.findOne(id, true),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleOrderDto: UpdateSaleOrderDto,
  ): Promise<ReturnSaleOrderDto> {
    return new ReturnSaleOrderDto(
      await this.saleOrdersService.update(id, updateSaleOrderDto),
    );
  }
}
