import { SaleOrder } from './../../../sales-orders/entities/sales-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sale_platform' })
export class SalePlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(
    () => SaleOrder,
    (salesOrder: SaleOrder) => salesOrder.salePlatform,
  )
  salesOrders?: SaleOrder[];

  constructor(partial: Partial<SalePlatform>) {
    Object.assign(this, partial);
  }
}
