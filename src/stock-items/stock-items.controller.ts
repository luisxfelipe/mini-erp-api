import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { StockItemsService } from './stock-items.service';
import { CreateStockItemDto } from './dto/create-stock-item.dto';
import { UpdateStockItemDto } from './dto/update-stock-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnStockItemDto } from './dto/return-stock-item.dto';

@Controller('stock-items')
@ApiTags('Stock items')
export class StockItemsController {
  constructor(private readonly stockItemsService: StockItemsService) {}

  @Post()
  async create(
    @Body() createStockItemDto: CreateStockItemDto,
  ): Promise<ReturnStockItemDto> {
    return await new ReturnStockItemDto(
      await this.stockItemsService.create(createStockItemDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnStockItemDto[]> {
    return (await this.stockItemsService.findAll()).map(
      (stockItem) => new ReturnStockItemDto(stockItem),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnStockItemDto> {
    return new ReturnStockItemDto(await this.stockItemsService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStockItemDto: UpdateStockItemDto,
  ): Promise<ReturnStockItemDto> {
    return new ReturnStockItemDto(
      await this.stockItemsService.update(id, updateStockItemDto),
    );
  }
}
