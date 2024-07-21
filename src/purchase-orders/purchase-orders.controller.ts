import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnPurchaseOrderDto } from './dto/return-purchase-order.dto';

@Controller('purchase-orders')
@ApiTags('Purchase Order')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post()
  async create(
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<ReturnPurchaseOrderDto> {
    return new ReturnPurchaseOrderDto(
      await this.purchaseOrdersService.create(createPurchaseOrderDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnPurchaseOrderDto[]> {
    return (await this.purchaseOrdersService.findAll(true)).map(
      (purchaseOrder) => new ReturnPurchaseOrderDto(purchaseOrder),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnPurchaseOrderDto> {
    return new ReturnPurchaseOrderDto(
      await this.purchaseOrdersService.findOne(+id, true),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ): Promise<ReturnPurchaseOrderDto> {
    return new ReturnPurchaseOrderDto(
      await this.purchaseOrdersService.update(+id, updatePurchaseOrderDto),
    );
  }
}
