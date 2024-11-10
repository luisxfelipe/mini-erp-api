import { productMock } from 'src/products/tests/mocks/product.mock';
import { ReturnPurchaseOrderItemDto } from '../../dto/return-purchase-order-item.dto';
import { purchaseOrderItemMock } from './purchase-order-item.mock';
import { productVariationMock } from 'src/products/product-variations/tests/mocks/product-variation.mock';

export const returnPurchaseOrderItemMock: ReturnPurchaseOrderItemDto = {
  id: purchaseOrderItemMock.id,
  purchaseOrderId: purchaseOrderItemMock.purchaseOrderId,
  product: productMock,
  productVariation: productVariationMock,
  supplierProductCode: purchaseOrderItemMock.supplierProductCode,
  price: purchaseOrderItemMock.price,
  productLink: purchaseOrderItemMock.productLink,
};
