import { PurchaseOrderItem } from './../../../purchase-orders/purchase-order-items/entities/purchase-order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'purchase_order_item_status' })
export class PurchaseOrderItemStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(
    () => PurchaseOrderItem,
    (purchaseOrderItem: PurchaseOrderItem) =>
      purchaseOrderItem.purchaseOrderItemStatus,
  )
  purchaseOrderItems?: PurchaseOrderItem[];

  constructor(partial: Partial<PurchaseOrderItemStatus>) {
    Object.assign(this, partial);
  }
}
