import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SaleOrderItemsService } from './sale-order-items.service';
import { CreateSaleOrderItemDto } from './dto/create-sale-order-item.dto';
import { UpdateSaleOrderItemDto } from './dto/update-sale-order-item.dto';
import { ReturnSaleOrderItemDto } from './dto/return-sale-order-item.dto';

@Controller('sale-order-items')
export class SaleOrderItemsController {
  constructor(private readonly saleOrderItemsService: SaleOrderItemsService) {}

  @Post()
  async create(
    @Body() createSaleOrderItemDto: CreateSaleOrderItemDto,
    @Param('saleOrderId', ParseIntPipe) saleOrderId: number,
  ): Promise<ReturnSaleOrderItemDto> {
    return new ReturnSaleOrderItemDto(
      await this.saleOrderItemsService.create(
        saleOrderId,
        createSaleOrderItemDto,
      ),
    );
  }

  @Get()
  async findAll(
    @Param('saleOrderId', ParseIntPipe) saleOrderId: number,
  ): Promise<ReturnSaleOrderItemDto[]> {
    return (await this.saleOrderItemsService.findAll(saleOrderId)).map(
      (saleOrderItem) => new ReturnSaleOrderItemDto(saleOrderItem),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnSaleOrderItemDto> {
    return new ReturnSaleOrderItemDto(
      await this.saleOrderItemsService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleOrderItemDto: UpdateSaleOrderItemDto,
  ): Promise<ReturnSaleOrderItemDto> {
    return new ReturnSaleOrderItemDto(
      await this.saleOrderItemsService.update(id, updateSaleOrderItemDto),
    );
  }
}
