import { Product } from 'src/products/entities/product.entity';
import { ProductVariation } from 'src/products/product-variations/entities/product-variation.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('supplier_product_code')
export class SupplierProductCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'product_variation_id', nullable: false })
  productVariationId: number;

  @Column({ name: 'supplier_id', nullable: false })
  supplierId: number;

  @Column({ name: 'supplier_product_code' })
  supplierProductCode: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(
    () => Product,
    (product: Product) => product.supplierProductCodes,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;

  @ManyToOne(
    () => ProductVariation,
    (productVariation: ProductVariation) =>
      productVariation.supplierProductCodes,
    { eager: true },
  )
  @JoinColumn({ name: 'product_variation_id', referencedColumnName: 'id' })
  productVariation?: ProductVariation;

  @ManyToOne(
    () => Supplier,
    (supplier: Supplier) => supplier.supplierProductCodes,
  )
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'id' })
  supplier?: Supplier;

  constructor(partial: Partial<SupplierProductCode>) {
    Object.assign(this, partial);
  }
}
