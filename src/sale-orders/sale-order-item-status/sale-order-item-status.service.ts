import { Injectable } from '@nestjs/common';
import { CreateSaleOrderItemStatusDto } from './dto/create-sale-order-item-status.dto';
import { UpdateSaleOrderItemStatusDto } from './dto/update-sale-order-item-status.dto';

@Injectable()
export class SaleOrderItemStatusService {
  create(createSaleOrderItemStatusDto: CreateSaleOrderItemStatusDto) {
    return 'This action adds a new saleOrderItemStatus';
  }

  findAll() {
    return `This action returns all saleOrderItemStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleOrderItemStatus`;
  }

  update(id: number, updateSaleOrderItemStatusDto: UpdateSaleOrderItemStatusDto) {
    return `This action updates a #${id} saleOrderItemStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleOrderItemStatus`;
  }
}
