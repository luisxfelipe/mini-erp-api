import { SaleOrderItem } from './../../../sale-orders/sale-order-items/entities/sale-order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sale_order_item_status' })
export class SaleOrderItemStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(
    () => SaleOrderItem,
    (saleOrderItem: SaleOrderItem) => saleOrderItem.saleOrderItemStatus,
  )
  saleOrderItems?: SaleOrderItem[];

  constructor(partial: Partial<SaleOrderItemStatus>) {
    Object.assign(this, partial);
  }
}
