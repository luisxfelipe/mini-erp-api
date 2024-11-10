import { PurchaseOrderItem } from './../../../purchase-orders/purchase-order-items/entities/purchase-order-item.entity';
import { StockItem } from './../../../stock-items/entities/stock-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock_item_status')
export class StockItemStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(() => StockItem, (stockItem: StockItem) => stockItem.product)
  stockItems?: PurchaseOrderItem[];

  constructor(partial: Partial<StockItemStatus>) {
    Object.assign(this, partial);
  }
}
