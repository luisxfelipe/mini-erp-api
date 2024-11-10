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
import { StockItemIdentifierTypesService } from './stock-item-identifier-types.service';
import { CreateStockItemIdentifierTypeDto } from './dto/create-stock-item-identifier-type.dto';
import { UpdateStockItemIdentifierTypeDto } from './dto/update-stock-item-identifier-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnStockItemIdentifierTypeDto } from './dto/return-stock-item-identifier-type';
import { DeleteResult } from 'typeorm';

@Controller('stock-item-identifier-type')
@ApiTags('Stock item identifier type')
export class StockItemIdentifierTypesController {
  constructor(
    private readonly stockItemIdentifierTypesService: StockItemIdentifierTypesService,
  ) {}

  @Post()
  async create(
    @Body() createStockItemIdentifierTypeDto: CreateStockItemIdentifierTypeDto,
  ): Promise<ReturnStockItemIdentifierTypeDto> {
    return new ReturnStockItemIdentifierTypeDto(
      await this.stockItemIdentifierTypesService.create(
        createStockItemIdentifierTypeDto,
      ),
    );
  }

  @Get()
  async findAll(): Promise<ReturnStockItemIdentifierTypeDto[]> {
    return (await this.stockItemIdentifierTypesService.findAll()).map(
      (saleOrder) => new ReturnStockItemIdentifierTypeDto(saleOrder),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnStockItemIdentifierTypeDto> {
    return new ReturnStockItemIdentifierTypeDto(
      await this.stockItemIdentifierTypesService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockItemIdentifierTypeDto: UpdateStockItemIdentifierTypeDto,
  ): Promise<ReturnStockItemIdentifierTypeDto> {
    return new ReturnStockItemIdentifierTypeDto(
      await this.stockItemIdentifierTypesService.update(
        id,
        updateStockItemIdentifierTypeDto,
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.stockItemIdentifierTypesService.remove(id);
  }
}
