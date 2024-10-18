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
import { SaleStatus } from '../sale-status/entities/sale-status.entity';
import { Platform } from '../../platforms/entities/platform.entity';
import { SaleOrderItem } from '../sale-order-items/entities/sale-order-item.entity';
import { SaleOrderRefund } from '../sale-order-refunds/entities/sale-order-refund.entity';

@Entity({ name: 'sale_order' })
export class SaleOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', name: 'date', nullable: false })
  date: Date;

  @Column({ name: 'order_number' })
  orderNumber: string;

  @Column({ name: 'tracking_code' })
  trackingCode: string;

  @Column({ name: 'platform_id', nullable: false })
  platformId: number;

  @Column({ name: 'status_id', nullable: false })
  statusId: number;

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

  @OneToMany(
    () => SaleOrderItem,
    (saleOrderItem: SaleOrderItem) => saleOrderItem.saleOrder,
  )
  saleOrderItems?: SaleOrderItem[];

  @ManyToOne(() => Platform, (platform: Platform) => platform.salesOrders)
  @JoinColumn({ name: 'platform_id', referencedColumnName: 'id' })
  platform?: Platform;

  @ManyToOne(
    () => SaleStatus,
    (saleStatus: SaleStatus) => saleStatus.salesOrders,
  )
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  saleStatus?: SaleStatus;

  @OneToMany(
    () => SaleOrderRefund,
    (saleOrderRefund: SaleOrderRefund) => saleOrderRefund.saleOrder,
  )
  saleOrderRefunds?: SaleOrderRefund[];

  constructor(partial: Partial<SaleOrder>) {
    Object.assign(this, partial);
  }
}
