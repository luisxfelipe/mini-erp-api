import { CreateStockItemIdentifierDto } from '../../dto/create-stock-item-identifier.dto';
import { stockItemIdentifierMock } from './stock-item-identifier.mock';

export const createStockItemIdentifierMock: CreateStockItemIdentifierDto = {
  stockItemIdentifierTypeId: stockItemIdentifierMock.stockItemIdentifierTypeId,
  value: stockItemIdentifierMock.value,
};
