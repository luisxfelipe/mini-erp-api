import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockItemsService } from './stock-items.service';
import { CreateStockItemDto } from './dto/create-stock-item.dto';
import { UpdateStockItemDto } from './dto/update-stock-item.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('stock-items')
@ApiTags('Stock items')
export class StockItemsController {
  constructor(private readonly stockItemsService: StockItemsService) {}

  @Post()
  create(@Body() createStockItemDto: CreateStockItemDto) {
    return this.stockItemsService.create(createStockItemDto);
  }

  @Get()
  findAll() {
    return this.stockItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockItemDto: UpdateStockItemDto,
  ) {
    return this.stockItemsService.update(+id, updateStockItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockItemsService.remove(+id);
  }
}
