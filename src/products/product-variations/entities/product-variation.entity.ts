import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from '../../entities/product.entity';

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

  constructor(partial: Partial<ProductVariation>) {
    Object.assign(this, partial);
  }
}
