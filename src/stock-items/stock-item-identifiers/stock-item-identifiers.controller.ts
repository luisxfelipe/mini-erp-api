import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { StockItemIdentifiersService } from './stock-item-identifiers.service';
import { CreateStockItemIdentifierDto } from './dto/create-stock-item-identifier.dto';
import { UpdateStockItemIdentifierDto } from './dto/update-stock-item-identifier.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnStockItemIdentifierDto } from './dto/return-stock-item-identifier.dto';

@Controller('stock-item-identifiers')
@ApiTags('Stock item identifiers')
export class StockItemIdentifiersController {
  constructor(
    private readonly stockItemIdentifiersService: StockItemIdentifiersService,
  ) {}

  @Post()
  async create(
    @Body() createStockItemIdentifierDto: CreateStockItemIdentifierDto,
  ): Promise<ReturnStockItemIdentifierDto> {
    return new ReturnStockItemIdentifierDto(
      await this.stockItemIdentifiersService.create(
        createStockItemIdentifierDto,
      ),
    );
  }

  @Get()
  async findAll(): Promise<ReturnStockItemIdentifierDto[]> {
    return (await this.stockItemIdentifiersService.findAll()).map(
      (stockItemIdentifier) =>
        new ReturnStockItemIdentifierDto(stockItemIdentifier),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnStockItemIdentifierDto> {
    return new ReturnStockItemIdentifierDto(
      await this.stockItemIdentifiersService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockItemIdentifierDto: UpdateStockItemIdentifierDto,
  ): Promise<ReturnStockItemIdentifierDto> {
    return new ReturnStockItemIdentifierDto(
      await this.stockItemIdentifiersService.update(
        id,
        updateStockItemIdentifierDto,
      ),
    );
  }
}
