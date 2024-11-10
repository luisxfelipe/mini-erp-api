import { StockItemStatus } from '../entities/stock-item-status.entity';

export class ReturnStockItemStatusDto {
  id: number;
  name: string;

  constructor(stockItemStatus: StockItemStatus) {
    this.id = stockItemStatus.id;
    this.name = stockItemStatus.name;
  }
}
