import { ReturnSaleOrderItemDto } from '../../dto/return-sale-order-item.dto';
import { saleOrderItemMock } from './purchase-sale-item.mock';

export const returnsaleOrderItemMock: ReturnSaleOrderItemDto = {
  id: saleOrderItemMock.id,
  saleOrderId: saleOrderItemMock.saleOrderId,
  productId: saleOrderItemMock.productId,
  productVariationId: saleOrderItemMock.productVariationId,
  saleOrderItemStatusId: saleOrderItemMock.saleOrderItemStatusId,
  price: saleOrderItemMock.price,
};
