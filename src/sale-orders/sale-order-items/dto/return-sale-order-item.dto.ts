import { ReturnProductVariationDto } from 'src/products/product-variations/dto/return-product-variation.dto';
import { SaleOrderItem } from '../entities/sale-order-item.entity';
import { ReturnProductDto } from 'src/products/dto/return-product.dto';
import { ReturnSaleOrderItemStatusDto } from 'src/sale-orders/sale-order-item-status/dto/return-sale-order-item-status';

export class ReturnSaleOrderItemDto {
  id: number;
  saleOrderId: number;
  product?: ReturnProductDto;
  productVariation?: ReturnProductVariationDto;
  saleOrderItemStatus?: ReturnSaleOrderItemStatusDto;
  price: number;

  constructor(saleOrderItem: SaleOrderItem) {
    this.id = saleOrderItem.id;
    this.saleOrderId = saleOrderItem.saleOrderId;
    this.product = saleOrderItem.product?.id
      ? new ReturnProductDto(saleOrderItem.product)
      : undefined;
    this.productVariation = saleOrderItem.productVariation?.id
      ? new ReturnProductVariationDto(saleOrderItem.productVariation)
      : undefined;
    this.saleOrderItemStatus = saleOrderItem.saleOrderItemStatus?.id
      ? new ReturnSaleOrderItemStatusDto(saleOrderItem.saleOrderItemStatus)
      : undefined;
    this.price = saleOrderItem.price;
  }
}
