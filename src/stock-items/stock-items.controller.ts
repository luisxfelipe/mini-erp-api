import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { StockItemsService } from './stock-items.service';
import { CreateStockItemDto } from './dto/create-stock-item.dto';
import { UpdateStockItemDto } from './dto/update-stock-item.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ReturnStockItemDto } from './dto/return-stock-item.dto';

@Controller('stock-items')
@ApiTags('Stock items')
export class StockItemsController {
  constructor(private readonly stockItemsService: StockItemsService) {}

  @Post()
  @ApiBody({
    type: [CreateStockItemDto],
    description: 'Array of stock items to be created',
    examples: [
      {
        value: [
          {
            purchaseOrderItemId: 0,
            productId: 0,
            productVariationId: 0,
            saleOrderItemId: 0,
            stockItemStatusId: 0,
          },
          // ...
        ],
      },
    ] as any,
  })
  async create(
    @Body() createStockItemDtos: CreateStockItemDto[],
  ): Promise<ReturnStockItemDto[]> {
    if (!createStockItemDtos || createStockItemDtos.length === 0) {
      throw new BadRequestException(
        'A lista de itens de estoque não pode estar vazia',
      );
    }
    const stockItems = await this.stockItemsService.create(createStockItemDtos);
    return stockItems.map((stockItem) => new ReturnStockItemDto(stockItem));
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
