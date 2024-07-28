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

import { Product } from '../../entities/product.entity';
import { PurchaseOrderItem } from './../../../purchase-orders/purchase-order-items/entities/purchase-order-item.entity';
import { SaleOrderItem } from './../../../sale-orders/sale-order-items/entities/sale-order-item.entity';

@Entity({ name: 'product_variation' })
export class ProductVariation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Product, (product: Product) => product.productVariations)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;

  @OneToMany(
    () => PurchaseOrderItem,
    (purchaseOrderItem: PurchaseOrderItem) =>
      purchaseOrderItem.productVariation,
  )
  purchaseOrderItems?: PurchaseOrderItem[];

  @OneToMany(
    () => SaleOrderItem,
    (saleOrderItem: SaleOrderItem) => saleOrderItem.productVariation,
  )
  saleOrderItems?: PurchaseOrderItem[];

  constructor(partial: Partial<ProductVariation>) {
    Object.assign(this, partial);
  }
}
