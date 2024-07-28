import { SaleOrderItemStatus } from '../entities/sale-order-item-status.entity';

export class ReturnSaleOrderItemStatusDto {
  id: number;
  name: string;

  constructor(saleOrderStatus: SaleOrderItemStatus) {
    this.id = saleOrderStatus.id;
    this.name = saleOrderStatus.name;
  }
}
