import { SaleOrder } from '../entities/sale-order.entity';
import { ReturnPlatformDto } from '../../platforms/dto/return-platform.dto';

import { ReturnSaleStatusDto } from '../sale-status/dto/return-sale-status.dto';

export class ReturnSaleOrderDto {
  id: number;
  date: Date;
  platform?: ReturnPlatformDto;
  orderNumber?: string;
  trackingCode?: string;
  status?: ReturnSaleStatusDto;
  discount?: number;
  shippingCost?: number;

  constructor(saleOrder: SaleOrder) {
    this.id = saleOrder.id;
    this.date = saleOrder.date;
    this.platform = saleOrder.platform
      ? new ReturnPlatformDto(saleOrder.platform)
      : undefined;
    this.orderNumber = saleOrder.orderNumber
      ? saleOrder.orderNumber
      : undefined;
    this.trackingCode = saleOrder.trackingCode
      ? saleOrder.trackingCode
      : undefined;
    this.status = saleOrder.saleStatus
      ? new ReturnSaleStatusDto(saleOrder.saleStatus)
      : undefined;
    this.discount = saleOrder.discount ? saleOrder.discount : undefined;
    this.shippingCost = saleOrder.shippingCost
      ? saleOrder.shippingCost
      : undefined;
  }
}
