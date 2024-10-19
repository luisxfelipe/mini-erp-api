import { productMock } from 'src/products/tests/mocks/product.mock';
import { ReturnSaleOrderItemDto } from '../../dto/return-sale-order-item.dto';
import { saleOrderItemMock } from './purchase-sale-item.mock';
import { productVariationMock } from 'src/products/product-variations/tests/mocks/product-variation.mock';

export const returnsaleOrderItemMock: ReturnSaleOrderItemDto = {
  id: saleOrderItemMock.id,
  saleOrderId: saleOrderItemMock.saleOrderId,
  product: productMock,
  productVariation: productVariationMock,
  saleOrderItemStatus: saleOrderItemMock.saleOrderItemStatus,
  price: saleOrderItemMock.price,
};
