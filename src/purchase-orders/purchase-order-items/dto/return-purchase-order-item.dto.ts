import { ReturnProductDto } from 'src/products/dto/return-product.dto';
import { PurchaseOrderItem } from '../entities/purchase-order-item.entity';
import { ReturnProductVariationDto } from 'src/products/product-variations/dto/return-product-variation.dto';
import { ReturnPurchaseOrderItemStatusDto } from 'src/purchase-orders/purchase-order-item-status/dto/return-purchase-order-item-status';

export class ReturnPurchaseOrderItemDto {
  id: number;
  purchaseOrderId: number;
  product?: ReturnProductDto;
  productVariation?: ReturnProductVariationDto;
  supplierProductCode?: string;
  price: number;
  purchaseOrderItemStatus?: ReturnPurchaseOrderItemStatusDto;
  productLink?: string;

  constructor(purchaseOrderItemEntity: PurchaseOrderItem) {
    this.id = purchaseOrderItemEntity.id;
    this.purchaseOrderId = purchaseOrderItemEntity.purchaseOrderId;
    this.product = purchaseOrderItemEntity.product?.id
      ? new ReturnProductDto(purchaseOrderItemEntity.product)
      : undefined;
    this.productVariation = purchaseOrderItemEntity.productVariation?.id
      ? new ReturnProductVariationDto(purchaseOrderItemEntity.productVariation)
      : undefined;
    this.supplierProductCode = purchaseOrderItemEntity.supplierProductCode
      ? purchaseOrderItemEntity.supplierProductCode
      : undefined;
    this.price = purchaseOrderItemEntity.price;
    this.purchaseOrderItemStatus = purchaseOrderItemEntity
      .purchaseOrderItemStatus?.id
      ? new ReturnPurchaseOrderItemStatusDto(
          purchaseOrderItemEntity.purchaseOrderItemStatus,
        )
      : undefined;
    this.productLink = purchaseOrderItemEntity.productLink
      ? purchaseOrderItemEntity.productLink
      : undefined;
  }
}
