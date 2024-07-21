import { PurchaseOrder } from 'src/purchase-orders/entities/purchase-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'purchase_order_refund' })
export class PurchaseOrderRefund {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purchase_order_id', nullable: false })
  purchaseOrderId: number;

  @Column({
    type: 'decimal',
    name: 'amount',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: number;

  @Column({ name: 'reason' })
  reason: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(
    () => PurchaseOrder,
    (purchaseOrder: PurchaseOrder) => purchaseOrder.purchaseOrderRefunds,
  )
  @JoinColumn({ name: 'purchase_order_id', referencedColumnName: 'id' })
  purchaseOrder?: PurchaseOrder;

  constructor(partial: Partial<PurchaseOrderRefund>) {
    Object.assign(this, partial);
  }
}
