import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleOrderItemStatusService } from './sale-order-item-status.service';
import { CreateSaleOrderItemStatusDto } from './dto/create-sale-order-item-status.dto';
import { UpdateSaleOrderItemStatusDto } from './dto/update-sale-order-item-status.dto';

@Controller('sale-order-item-status')
export class SaleOrderItemStatusController {
  constructor(private readonly saleOrderItemStatusService: SaleOrderItemStatusService) {}

  @Post()
  create(@Body() createSaleOrderItemStatusDto: CreateSaleOrderItemStatusDto) {
    return this.saleOrderItemStatusService.create(createSaleOrderItemStatusDto);
  }

  @Get()
  findAll() {
    return this.saleOrderItemStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleOrderItemStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleOrderItemStatusDto: UpdateSaleOrderItemStatusDto) {
    return this.saleOrderItemStatusService.update(+id, updateSaleOrderItemStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleOrderItemStatusService.remove(+id);
  }
}
