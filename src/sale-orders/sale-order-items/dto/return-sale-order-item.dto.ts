import { SaleOrderItem } from '../entities/sale-order-item.entity';

export class ReturnSaleOrderItemDto {
  id: number;
  saleOrderId: number;
  productId: number;
  productVariationId: number;
  saleOrderItemStatusId: number;
  price: number;

  constructor(saleOrderItem: SaleOrderItem) {
    this.id = saleOrderItem.id;
    this.saleOrderId = saleOrderItem.saleOrderId;
    this.productId = saleOrderItem.productId;
    this.productVariationId = saleOrderItem.productVariationId;
    this.saleOrderItemStatusId = saleOrderItem.saleOrderItemStatusId;
    this.price = saleOrderItem.price;
  }
}
