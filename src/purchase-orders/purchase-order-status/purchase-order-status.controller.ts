import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PurchaseOrderStatusService } from './purchase-order-status.service';
import { CreatePurchaseOrderStatusDto } from './dto/create-purchase-order-status.dto';
import { UpdatePurchaseOrderStatusDto } from './dto/update-purchase-order-status.dto';
import { ReturnPurchaseOrderStatusDto } from './dto/return-purchase-order-status.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('purchase-order-status')
@ApiTags('Purchase Order Status')
export class PurchaseOrderStatusController {
  constructor(
    private readonly purchaseOrderStatusService: PurchaseOrderStatusService,
  ) {}

  @Post()
  async create(
    @Body() createPurchaseOrderStatusDto: CreatePurchaseOrderStatusDto,
  ): Promise<ReturnPurchaseOrderStatusDto> {
    return new ReturnPurchaseOrderStatusDto(
      await this.purchaseOrderStatusService.create(
        createPurchaseOrderStatusDto,
      ),
    );
  }

  @Get()
  async findAll(): Promise<ReturnPurchaseOrderStatusDto[]> {
    return (await this.purchaseOrderStatusService.findAll()).map(
      (status) => new ReturnPurchaseOrderStatusDto(status),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnPurchaseOrderStatusDto> {
    return new ReturnPurchaseOrderStatusDto(
      await this.purchaseOrderStatusService.findOne(id, true),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePurchaseOrderStatusDto: UpdatePurchaseOrderStatusDto,
  ): Promise<ReturnPurchaseOrderStatusDto> {
    return new ReturnPurchaseOrderStatusDto(
      await this.purchaseOrderStatusService.update(
        id,
        updatePurchaseOrderStatusDto,
      ),
    );
  }
}
