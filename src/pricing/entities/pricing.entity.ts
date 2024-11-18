import { Platform } from 'src/platforms/entities/platform.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductVariation } from 'src/products/product-variations/entities/product-variation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pricing')
export class Pricing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'product_variation_id', nullable: false })
  productVariationId: number;

  @Column({ name: 'sale_platform_id', nullable: false })
  salePlatformId: number;

  @Column({
    type: 'decimal',
    name: 'cost_price',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  costPrice: number;

  @Column({ name: 'profit_percentage', nullable: false })
  profitPercentage: number;

  @Column({
    type: 'decimal',
    name: 'additional_profit',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  additionalProfit: number;

  @Column({
    type: 'decimal',
    name: 'sale_price',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  salePrice: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Platform, (platform: Platform) => platform.pricing, {
    eager: true,
  })
  @JoinColumn({ name: 'sale_platform_id', referencedColumnName: 'id' })
  salePlatform?: Platform;

  @ManyToOne(() => Product, (product: Product) => product.purchaseOrderItem, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;

  @ManyToOne(
    () => ProductVariation,
    (productVariation: ProductVariation) => productVariation.pricing,
    { eager: true },
  )
  @JoinColumn({ name: 'product_variation_id', referencedColumnName: 'id' })
  productVariation?: ProductVariation;

  constructor(partial: Partial<Pricing>) {
    Object.assign(this, partial);
  }
}
