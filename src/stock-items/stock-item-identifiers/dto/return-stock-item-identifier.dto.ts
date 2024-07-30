import { StockItemIdentifier } from '../entities/stock-item-identifier.entity';

export class ReturnStockItemIdentifierDto {
  id: number;
  stockItemIdentifierTypeId: number;
  value: string;

  constructor(stockItemIdentifier: StockItemIdentifier) {
    this.id = stockItemIdentifier.id;
    this.stockItemIdentifierTypeId =
      stockItemIdentifier.stockItemIdentifierTypeId;
    this.value = stockItemIdentifier.value;
  }
}
