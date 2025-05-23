import { SalesPlatformCommission } from 'src/pricing/sales-platform-commissions/entities/sales-platform-commission.entity';
import { SaleOrder } from '../../sale-orders/entities/sale-order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pricing } from 'src/pricing/entities/pricing.entity';

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

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => SaleOrder, (salesOrder: SaleOrder) => salesOrder.platform)
  salesOrders?: SaleOrder[];

  @OneToMany(
    () => SalesPlatformCommission,
    (salesPlatformCommission: SalesPlatformCommission) =>
      salesPlatformCommission.salePlatform,
  )
  salesPlatformCommissions?: SalesPlatformCommission[];

  @OneToMany(() => Pricing, (pricing: Pricing) => pricing.salePlatform)
  pricing?: Pricing[];

  constructor(partial: Partial<Platform>) {
    Object.assign(this, partial);
  }
}
