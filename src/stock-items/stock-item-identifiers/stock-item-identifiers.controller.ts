import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockItemIdentifiersService } from './stock-item-identifiers.service';
import { CreateStockItemIdentifierDto } from './dto/create-stock-item-identifier.dto';
import { UpdateStockItemIdentifierDto } from './dto/update-stock-item-identifier.dto';

@Controller('stock-item-identifier')
export class StockItemIdentifiersController {
  constructor(
    private readonly stockItemIdentifiersService: StockItemIdentifiersService,
  ) {}

  @Post()
  create(@Body() createStockItemIdentifierDto: CreateStockItemIdentifierDto) {
    return this.stockItemIdentifiersService.create(
      createStockItemIdentifierDto,
    );
  }

  @Get()
  findAll() {
    return this.stockItemIdentifiersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockItemIdentifiersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockItemIdentifierDto: UpdateStockItemIdentifierDto,
  ) {
    return this.stockItemIdentifiersService.update(
      +id,
      updateStockItemIdentifierDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockItemIdentifiersService.remove(+id);
  }
}
