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
import { StockItemIdentifierTypeService } from './stock-item-identifier-type.service';
import { CreateStockItemIdentifierTypeDto } from './dto/create-stock-item-identifier-type.dto';
import { UpdateStockItemIdentifierTypeDto } from './dto/update-stock-item-identifier-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnStockItemIdentifierTypeDto } from './dto/return-stock-item-identifier-type';
import { DeleteResult } from 'typeorm';

@Controller('stock-item-identifier-type')
@ApiTags('Stock item identifier type')
export class StockItemIdentifierTypeController {
  constructor(
    private readonly stockItemIdentifierTypeService: StockItemIdentifierTypeService,
  ) {}

  @Post()
  async create(
    @Body() createStockItemIdentifierTypeDto: CreateStockItemIdentifierTypeDto,
  ): Promise<ReturnStockItemIdentifierTypeDto> {
    return new ReturnStockItemIdentifierTypeDto(
      await this.stockItemIdentifierTypeService.create(
        createStockItemIdentifierTypeDto,
      ),
    );
  }

  @Get()
  async findAll(): Promise<ReturnStockItemIdentifierTypeDto[]> {
    return (await this.stockItemIdentifierTypeService.findAll()).map(
      (saleOrder) => new ReturnStockItemIdentifierTypeDto(saleOrder),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnStockItemIdentifierTypeDto> {
    console.log(`id: ${id}`);
    return new ReturnStockItemIdentifierTypeDto(
      await this.stockItemIdentifierTypeService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockItemIdentifierTypeDto: UpdateStockItemIdentifierTypeDto,
  ): Promise<ReturnStockItemIdentifierTypeDto> {
    return new ReturnStockItemIdentifierTypeDto(
      await this.stockItemIdentifierTypeService.update(
        id,
        updateStockItemIdentifierTypeDto,
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.stockItemIdentifierTypeService.remove(id);
  }
}
