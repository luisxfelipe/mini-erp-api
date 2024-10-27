import { SalesPlatformCommission } from 'src/pricing/sales-platform-commissions/entities/sales-platform-commission.entity';
import { SaleOrder } from '../../sale-orders/entities/sale-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sale_platform' })
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(() => SaleOrder, (salesOrder: SaleOrder) => salesOrder.platform)
  salesOrders?: SaleOrder[];

  @OneToMany(
    () => SalesPlatformCommission,
    (salesPlatformCommission: SalesPlatformCommission) =>
      salesPlatformCommission.salePlatform,
  )
  salesPlatformCommissions?: SalesPlatformCommission[];

  constructor(partial: Partial<Platform>) {
    Object.assign(this, partial);
  }
}
