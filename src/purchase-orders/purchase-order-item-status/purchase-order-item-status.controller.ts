import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PurchaseOrderItemStatusService } from './purchase-order-item-status.service';
import { CreatePurchaseOrderItemStatusDto } from './dto/create-purchase-order-item-status.dto';
import { UpdatePurchaseOrderItemStatusDto } from './dto/update-purchase-order-item-status.dto';
import { ReturnPurchaseOrderItemStatusDto } from './dto/return-purchase-order-item-status';

@Controller('purchase-order-item-status')
export class PurchaseOrderItemStatusController {
  constructor(
    private readonly purchaseOrderItemStatusService: PurchaseOrderItemStatusService,
  ) {}

  @Post()
  async create(
    @Body() createPurchaseOrderItemStatusDto: CreatePurchaseOrderItemStatusDto,
  ): Promise<ReturnPurchaseOrderItemStatusDto> {
    return new ReturnPurchaseOrderItemStatusDto(
      await this.purchaseOrderItemStatusService.create(
        createPurchaseOrderItemStatusDto,
      ),
    );
  }

  @Get()
  async findAll(): Promise<ReturnPurchaseOrderItemStatusDto[]> {
    return (await this.purchaseOrderItemStatusService.findAll()).map(
      (status) => new ReturnPurchaseOrderItemStatusDto(status),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnPurchaseOrderItemStatusDto> {
    return new ReturnPurchaseOrderItemStatusDto(
      await this.purchaseOrderItemStatusService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePurchaseOrderItemStatusDto: UpdatePurchaseOrderItemStatusDto,
  ): Promise<ReturnPurchaseOrderItemStatusDto> {
    return new ReturnPurchaseOrderItemStatusDto(
      await this.purchaseOrderItemStatusService.update(
        id,
        updatePurchaseOrderItemStatusDto,
      ),
    );
  }
}
