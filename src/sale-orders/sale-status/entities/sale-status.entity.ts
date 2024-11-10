import { SaleOrder } from '../../entities/sale-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sale_status' })
export class SaleStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(() => SaleOrder, (salesOrder: SaleOrder) => salesOrder.saleStatus)
  salesOrders?: SaleOrder[];

  constructor(partial: Partial<SaleStatus>) {
    Object.assign(this, partial);
  }
}
