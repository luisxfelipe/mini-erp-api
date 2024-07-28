import { SaleOrder } from '../entities/sales-order.entity';
import { ReturnSalePlatformDto } from '../sale-platforms/dto/return-sale-platform.dto';

import { ReturnSaleStatusDto } from '../sale-status/dto/return-sale-status.dto';

export class ReturnSaleOrderDto {
  id: number;
  salePlatform?: ReturnSalePlatformDto;
  orderNumber?: string;
  trackingCode?: string;
  saleStatus?: ReturnSaleStatusDto;
  discount?: number;
  shippingCost?: number;

  constructor(saleOrder: SaleOrder) {
    this.id = saleOrder.id;
    this.salePlatform = saleOrder.salePlatform
      ? new ReturnSalePlatformDto(saleOrder.salePlatform)
      : undefined;
    this.orderNumber = saleOrder.orderNumber
      ? saleOrder.orderNumber
      : undefined;
    this.trackingCode = saleOrder.trackingCode
      ? saleOrder.trackingCode
      : undefined;
    this.saleStatus = saleOrder.saleStatus
      ? new ReturnSaleStatusDto(saleOrder.saleStatus)
      : undefined;
    this.discount = saleOrder.discount ? saleOrder.discount : undefined;
    this.shippingCost = saleOrder.shippingCost
      ? saleOrder.shippingCost
      : undefined;
  }
}
