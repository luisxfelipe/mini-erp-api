import { SaleOrder } from './../../../sale-orders/entities/sale-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sale_order_refund' })
export class SaleOrderRefund {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sale_order_id', nullable: false })
  saleOrderId: number;

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
    () => SaleOrder,
    (saleOrder: SaleOrder) => saleOrder.saleOrderRefunds,
  )
  @JoinColumn({ name: 'sale_order_id', referencedColumnName: 'id' })
  saleOrder?: SaleOrder;

  constructor(partial: Partial<SaleOrderRefund>) {
    Object.assign(this, partial);
  }
}
