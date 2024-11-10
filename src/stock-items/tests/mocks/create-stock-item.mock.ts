import { CreateStockItemDto } from './../../../stock-items/dto/create-stock-item.dto';
import { stockItemMock } from './stock-item.mock';

export const createStockItemMock: CreateStockItemDto = {
  purchaseOrderItemId: stockItemMock.purchaseOrderItemId,
  productId: stockItemMock.productId,
  productVariationId: stockItemMock.productVariationId,
  saleOrderItemId: stockItemMock.saleOrderItemId,
  stockItemStatusId: stockItemMock.stockItemStatusId,
  identifier: stockItemMock.identifier,
  identifierTypeId: stockItemMock.identifierTypeId,
};
