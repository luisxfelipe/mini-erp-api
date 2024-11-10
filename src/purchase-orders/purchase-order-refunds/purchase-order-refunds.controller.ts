import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PurchaseOrderRefundsService } from './purchase-order-refunds.service';
import { CreatePurchaseOrderRefundDto } from './dto/create-purchase-order-refund.dto';
import { UpdatePurchaseOrderRefundDto } from './dto/update-purchase-order-refund.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnPurchaseOrderRefundDto } from './dto/return-purchase-order-refund.dto';

@Controller('purchase-orders/:purchaseOrderId/purchase-order-refunds')
@ApiTags('Purchase order refunds')
export class PurchaseOrderRefundsController {
  constructor(
    private readonly purchaseOrderRefundsService: PurchaseOrderRefundsService,
  ) {}

  @Post()
  async create(
    @Body() createPurchaseOrderRefundDto: CreatePurchaseOrderRefundDto,
    @Param('purchaseOrderId', ParseIntPipe) purchaseOrderId: number,
  ): Promise<ReturnPurchaseOrderRefundDto> {
    return new ReturnPurchaseOrderRefundDto(
      await this.purchaseOrderRefundsService.create(
        purchaseOrderId,
        createPurchaseOrderRefundDto,
      ),
    );
  }

  @Get()
  async findAll(
    @Param('purchaseOrderId', ParseIntPipe) purchaseOrderId: number,
  ): Promise<ReturnPurchaseOrderRefundDto[]> {
    return (
      await this.purchaseOrderRefundsService.findAll(purchaseOrderId)
    ).map(
      (purchaseOrderRefund) =>
        new ReturnPurchaseOrderRefundDto(purchaseOrderRefund),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnPurchaseOrderRefundDto> {
    return new ReturnPurchaseOrderRefundDto(
      await this.purchaseOrderRefundsService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePurchaseOrderRefundDto: UpdatePurchaseOrderRefundDto,
  ): Promise<ReturnPurchaseOrderRefundDto> {
    return new ReturnPurchaseOrderRefundDto(
      await this.purchaseOrderRefundsService.update(
        id,
        updatePurchaseOrderRefundDto,
      ),
    );
  }
}
