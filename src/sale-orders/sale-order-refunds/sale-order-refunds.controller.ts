import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SaleOrderRefundsService } from './sale-order-refunds.service';
import { CreateSaleOrderRefundDto } from './dto/create-sale-order-refund.dto';
import { UpdateSaleOrderRefundDto } from './dto/update-sale-order-refund.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnSaleOrderRefundDto } from './dto/return-sale-order-refund.dto';

@Controller('sale-orders/:saleOrderId/sale-order-refunds')
@ApiTags('Sale order refunds')
export class SaleOrderRefundsController {
  constructor(
    private readonly saleOrderRefundsService: SaleOrderRefundsService,
  ) {}

  @Post()
  async create(
    @Body() createSaleOrderRefundDto: CreateSaleOrderRefundDto,
    @Param('saleOrderId', ParseIntPipe) saleOrderId: number,
  ): Promise<ReturnSaleOrderRefundDto> {
    return new ReturnSaleOrderRefundDto(
      await this.saleOrderRefundsService.create(
        saleOrderId,
        createSaleOrderRefundDto,
      ),
    );
  }

  @Get()
  async findAll(
    @Param('saleOrderId', ParseIntPipe) saleOrderId: number,
  ): Promise<ReturnSaleOrderRefundDto[]> {
    return (await this.saleOrderRefundsService.findAll(saleOrderId)).map(
      (saleOrderRefund) => new ReturnSaleOrderRefundDto(saleOrderRefund),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnSaleOrderRefundDto> {
    return new ReturnSaleOrderRefundDto(
      await this.saleOrderRefundsService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleOrderRefundDto: UpdateSaleOrderRefundDto,
  ): Promise<ReturnSaleOrderRefundDto> {
    return new ReturnSaleOrderRefundDto(
      await this.saleOrderRefundsService.update(id, updateSaleOrderRefundDto),
    );
  }
}
