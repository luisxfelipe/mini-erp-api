import { Platform } from 'src/platforms/entities/platform.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sale_platform_commission')
export class SalesPlatformCommission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sale_platform_id', nullable: false })
  salePlatformId: number;

  @Column({ name: 'commission_percentage', nullable: false })
  commissionPercentage: number;

  @Column({
    type: 'decimal',
    name: 'max_commission',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  maxCommission: number;

  @Column({
    type: 'decimal',
    name: 'cost_per_item_sold',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  costPerItemSold: number;

  @Column({ name: 'default_profit_percentage', nullable: false })
  defaultProfitPercentage: number;

  @Column({ name: 'additional_profit', nullable: true })
  additionalProfit: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(
    () => Platform,
    (platform: Platform) => platform.salesPlatformCommissions,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'sale_platform_id', referencedColumnName: 'id' })
  salePlatform?: Platform;

  constructor(partial: Partial<SalesPlatformCommission>) {
    Object.assign(this, partial);
  }
}
