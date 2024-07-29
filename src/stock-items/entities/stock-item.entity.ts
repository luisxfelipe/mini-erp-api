import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stock_item' })
export class StockItem {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(partial: Partial<StockItem>) {
    Object.assign(this, partial);
  }
}
