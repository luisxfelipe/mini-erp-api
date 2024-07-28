import { ReturnSaleOrderItemDto } from '../../dto/return-sale-order-item.dto';
import { saleOrderItemMock } from './purchase-sale-item.mock';

export const returnsaleOrderItemMock: ReturnSaleOrderItemDto = {
  id: saleOrderItemMock.id,
  saleOrderId: saleOrderItemMock.saleOrderId,
  productId: saleOrderItemMock.productId,
  productVariationId: saleOrderItemMock.productVariationId,
  price: saleOrderItemMock.price,
  quantity: saleOrderItemMock.quantity,
};
