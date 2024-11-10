import { SaleOrderItem } from '../../entities/sale-order-item.entity';
import { productMock } from '../../../../products/tests/mocks/product.mock';
import { productVariationMock } from '../../../../products/product-variations/tests/mocks/product-variation.mock';
import { saleOrderMock } from './../../../../sale-orders/tests/mocks/sale-order.mock';
import { saleOrderItemStatusMock } from './../../../../sale-orders/sale-order-item-status/tests/mocks/sale-order-item-status.mock';
export const saleOrderItemMock: SaleOrderItem = {
  id: 1,
  saleOrderId: saleOrderMock.id,
  productId: productMock.id,
  productVariationId: productVariationMock.id,
  saleOrderItemStatusId: saleOrderItemStatusMock.id,
  price: 48.97,
  createdAt: new Date(),
  updatedAt: new Date(),
};
