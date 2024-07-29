import { StockItemIdentifierType } from '../entities/stock-item-identifier-type.entity';

export class ReturnStockItemIdentifierTypeDto {
  id: number;
  name: string;

  constructor(stockItemStatus: StockItemIdentifierType) {
    this.id = stockItemStatus.id;
    this.name = stockItemStatus.name;
  }
}
