import { stockItemIdentifierTypeMock } from 'src/stock-items/stock-item-identifier-types/tests/mocks/stock-item-identifier-type.mock';
import { productVariationMock } from './../../../products/product-variations/tests/mocks/product-variation.mock';
import { productMock } from './../../../products/tests/mocks/product.mock';
import { purchaseOrderItemMock } from './../../../purchase-orders/purchase-order-items/tests/mocks/purchase-order-item.mock';
import { saleOrderItemMock } from './../../../sale-orders/sale-order-items/tests/mocks/purchase-sale-item.mock';
import { StockItem } from './../../../stock-items/entities/stock-item.entity';
import { stockItemStatusMock } from './../../../stock-items/stock-item-status/tests/mocks/stock-item-status.mock';

export const stockItemMock: StockItem = {
  id: 1,
  purchaseOrderItemId: purchaseOrderItemMock.id,
  productId: productMock.id,
  productVariationId: productVariationMock.id,
  saleOrderItemId: saleOrderItemMock.id,
  stockItemStatusId: stockItemStatusMock.id,
  identifier: 'identifier',
  identifierTypeId: stockItemIdentifierTypeMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
