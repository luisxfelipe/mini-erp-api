import { ReturnProductDto } from 'src/products/dto/return-product.dto';
import { PurchaseOrderItem } from '../entities/purchase-order-item.entity';
import { ReturnProductVariationDto } from 'src/products/product-variations/dto/return-product-variation.dto';

export class ReturnPurchaseOrderItemDto {
  id: number;
  purchaseOrderId: number;
  product?: ReturnProductDto;
  productVariation?: ReturnProductVariationDto;
  supplierProductCode?: string;
  price: number;
  product_link?: string;

  constructor(purchaseOrderItemEntity: PurchaseOrderItem) {
    this.id = purchaseOrderItemEntity.id;
    this.purchaseOrderId = purchaseOrderItemEntity.purchaseOrderId;
    this.product = purchaseOrderItemEntity.productId
      ? new ReturnProductDto(purchaseOrderItemEntity.product)
      : undefined;
    this.productVariation = purchaseOrderItemEntity.productVariationId
      ? new ReturnProductVariationDto(purchaseOrderItemEntity.productVariation)
      : undefined;
    this.supplierProductCode = purchaseOrderItemEntity.supplierProductCode
      ? purchaseOrderItemEntity.supplierProductCode
      : undefined;
    this.price = purchaseOrderItemEntity.price;
    this.product_link = purchaseOrderItemEntity.product_link
      ? purchaseOrderItemEntity.product_link
      : undefined;
  }
}
