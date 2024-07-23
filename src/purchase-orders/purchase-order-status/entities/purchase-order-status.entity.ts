import { PurchaseOrder } from './../../../purchase-orders/entities/purchase-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'purchase_order_status' })
export class PurchaseOrderStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(
    () => PurchaseOrder,
    (purchaseOrder: PurchaseOrder) => purchaseOrder.purchaseOrderStatus,
  )
  purchaseOrders?: PurchaseOrder[];

  constructor(partial: Partial<PurchaseOrderStatus>) {
    Object.assign(this, partial);
  }
}
