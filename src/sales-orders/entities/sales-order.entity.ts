import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SaleStatus } from '../sale-status/entities/sale-status.entity';
import { SalePlatform } from '../sale-platforms/entities/sale-platform.entity';

@Entity({ name: 'sale_order' })
export class SaleOrder {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(
    () => SalePlatform,
    (salePlatform: SalePlatform) => salePlatform.salesOrders,
  )
  @JoinColumn({ name: 'platform_id', referencedColumnName: 'id' })
  salePlatform?: SalePlatform;

  @ManyToOne(
    () => SaleStatus,
    (saleStatus: SaleStatus) => saleStatus.salesOrders,
  )
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  saleStatus?: SaleStatus;

  constructor(partial: Partial<SaleOrder>) {
    Object.assign(this, partial);
  }
}
