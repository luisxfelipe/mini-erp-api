import { productMock } from './../../../../products/tests/mocks/product.mock';
import { CreateSaleOrderItemDto } from '../../dto/create-sale-order-item.dto';
import { productVariationMock } from './../../../../products/product-variations/tests/mocks/product-variation.mock';
import { saleOrderItemStatusMock } from './../../../../sale-orders/sale-order-item-status/tests/mocks/sale-order-item-status.mock';

export const createSaleOrderItemMock: CreateSaleOrderItemDto = {
  productId: productMock.id,
  productVariationId: productVariationMock.id,
  saleOrderItemStatusId: saleOrderItemStatusMock.id,
  price: 48.97,
};
