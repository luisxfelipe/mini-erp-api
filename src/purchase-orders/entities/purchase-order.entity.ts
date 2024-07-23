import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseOrderStatus } from '../purchase-order-status/entities/purchase-order-status.entity';
import { Supplier } from './../../suppliers/entities/supplier.entity';
import { PurchaseOrderItem } from '../purchase-order-items/entities/purchase-order-item.entity';
import { PurchaseOrderRefund } from '../purchase-order-refunds/entities/purchase-order-refund.entity';

@Entity({ name: 'purchase_order' })
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'supplier_id', nullable: false })
  supplierId: number;

  @Column({ name: 'order_number' })
  orderNumber: string;

  @Column({ name: 'tracking_code' })
  trackingCode: string;

  @Column({ name: 'purchase_order_status_id', nullable: false })
  purchaseOrderStatusId: number;

  @Column({
    type: 'decimal',
    name: 'discount',
    precision: 10,
    scale: 2,
  })
  discount: number;

  @Column({
    type: 'decimal',
    name: 'shipping_cost',
    precision: 10,
    scale: 2,
  })
  shippingCost: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Supplier, (supplier: Supplier) => supplier.purchaseOrders)
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'id' })
  supplier?: Supplier;

  @ManyToOne(
    () => PurchaseOrderStatus,
    (purchaseOrderStatus: PurchaseOrderStatus) =>
      purchaseOrderStatus.purchaseOrders,
  )
  @JoinColumn({ name: 'purchase_order_status_id', referencedColumnName: 'id' })
  purchaseOrderStatus?: PurchaseOrderStatus;

  @OneToMany(
    () => PurchaseOrderItem,
    (purchaseOrderItem: PurchaseOrderItem) => purchaseOrderItem.purchaseOrder,
  )
  purchaseOrderItems?: PurchaseOrderItem[];

  @OneToMany(
    () => PurchaseOrderRefund,
    (purchaseOrderRefund: PurchaseOrderRefund) =>
      purchaseOrderRefund.purchaseOrder,
  )
  purchaseOrderRefunds?: PurchaseOrderRefund[];

  constructor(partial: Partial<PurchaseOrder>) {
    Object.assign(this, partial);
  }
}
