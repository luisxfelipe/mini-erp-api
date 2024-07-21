import { Category } from '../categories/entities/category.entity';
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
import { ProductVariation } from '../product-variations/entities/product-variation.entity';
import { PurchaseOrderItem } from 'src/purchase-orders/purchase-order-items/entities/purchase-order-item.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ nullable: false })
  description: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Category, (category: Category) => category.products)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: Category;

  @OneToMany(
    () => ProductVariation,
    (productVariation: ProductVariation) => productVariation.product,
  )
  productVariations?: ProductVariation[];

  @OneToMany(
    () => PurchaseOrderItem,
    (purchaseOrderItem: PurchaseOrderItem) => purchaseOrderItem.product,
  )
  purchaseOrderItem?: PurchaseOrderItem;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
