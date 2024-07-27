import { Injectable } from '@nestjs/common';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';

@Injectable()
export class SalesOrdersService {
  create(createSalesOrderDto: CreateSalesOrderDto) {
    return 'This action adds a new salesOrder';
  }

  findAll() {
    return `This action returns all salesOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesOrder`;
  }

  update(id: number, updateSalesOrderDto: UpdateSalesOrderDto) {
    return `This action updates a #${id} salesOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesOrder`;
  }
}
