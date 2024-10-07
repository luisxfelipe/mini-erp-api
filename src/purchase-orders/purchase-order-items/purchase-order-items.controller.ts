import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PurchaseOrderItemsService } from './purchase-order-items.service';
import { CreatePurchaseOrderItemDto } from './dto/create-purchase-order-item.dto';
import { UpdatePurchaseOrderItemDto } from './dto/update-purchase-order-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnPurchaseOrderItemDto } from './dto/return-purchase-order-item.dto';

@Controller('purchase-orders/:purchaseOrderId/purchase-order-items')
@ApiTags('Purchase order items')
export class PurchaseOrderItemsController {
  constructor(
    private readonly purchaseOrderItemsService: PurchaseOrderItemsService,
  ) {}

  @Post()
  async create(
    @Body() createPurchaseOrderItemDto: CreatePurchaseOrderItemDto,
    @Param('purchaseOrderId', ParseIntPipe) purchaseOrderId: number,
  ): Promise<ReturnPurchaseOrderItemDto> {
    return new ReturnPurchaseOrderItemDto(
      await this.purchaseOrderItemsService.create(
        purchaseOrderId,
        createPurchaseOrderItemDto,
      ),
    );
  }

  @Get()
  async findAll(
    @Param('purchaseOrderId', ParseIntPipe) purchaseOrderId: number,
  ): Promise<ReturnPurchaseOrderItemDto[]> {
    return (await this.purchaseOrderItemsService.findAll(purchaseOrderId)).map(
      (purchaseOrderItem) => new ReturnPurchaseOrderItemDto(purchaseOrderItem),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnPurchaseOrderItemDto> {
    return new ReturnPurchaseOrderItemDto(
      await this.purchaseOrderItemsService.findOne(id, true),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto,
  ): Promise<ReturnPurchaseOrderItemDto> {
    return new ReturnPurchaseOrderItemDto(
      await this.purchaseOrderItemsService.update(
        id,
        updatePurchaseOrderItemDto,
      ),
    );
  }
}
