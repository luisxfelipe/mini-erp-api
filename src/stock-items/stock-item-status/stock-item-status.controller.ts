import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StockItemStatusService } from './stock-item-status.service';
import { CreateStockItemStatusDto } from './dto/create-stock-item-status.dto';
import { UpdateStockItemStatusDto } from './dto/update-stock-item-status.dto';
import { ReturnStockItemStatusDto } from './dto/return-stock-item-status.dto';
import { DeleteResult } from 'typeorm';

@Controller('stock-item-status')
export class StockItemStatusController {
  constructor(
    private readonly stockItemStatusService: StockItemStatusService,
  ) {}

  @Post()
  async create(
    @Body() createStockItemStatusDto: CreateStockItemStatusDto,
  ): Promise<ReturnStockItemStatusDto> {
    return new ReturnStockItemStatusDto(
      await this.stockItemStatusService.create(createStockItemStatusDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnStockItemStatusDto[]> {
    return (await this.stockItemStatusService.findAll()).map(
      (saleOrder) => new ReturnStockItemStatusDto(saleOrder),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnStockItemStatusDto> {
    console.log(`id: ${id}`);
    return new ReturnStockItemStatusDto(
      await this.stockItemStatusService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockItemStatusDto: UpdateStockItemStatusDto,
  ): Promise<ReturnStockItemStatusDto> {
    return new ReturnStockItemStatusDto(
      await this.stockItemStatusService.update(id, updateStockItemStatusDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.stockItemStatusService.remove(id);
  }
}
