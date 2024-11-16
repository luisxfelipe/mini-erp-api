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

@Entity('integration_product_supplier_erp')
export class IntegrationProductSupplierErp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'product_variation_id', nullable: false })
  productVariationId: number;

  @Column({ name: 'supplier_id', nullable: false })
  supplierId: number;

  @Column({
    type: 'decimal',
    name: 'supplier_price',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  supplierPrice: number;

  @Column({ name: 'supplier_product_code' })
  supplierProductCode: string;

  @Column({ name: 'in_stock_in_the_supplier', nullable: false })
  inStockInTheSupplier: boolean;

  @Column({ name: 'supplier_product_link', nullable: true })
  supplierProductLink: string;

  @Column({ name: 'bling_product_id', nullable: false })
  blingProductId: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(
    () => Product,
    (product: Product) => product.integrationProductSupplierErp,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;

  @ManyToOne(
    () => ProductVariation,
    (productVariation: ProductVariation) =>
      productVariation.integrationProductSupplierErp,
    { eager: true },
  )
  @JoinColumn({ name: 'product_variation_id', referencedColumnName: 'id' })
  productVariation?: ProductVariation;

  @ManyToOne(
    () => Supplier,
    (supplier: Supplier) => supplier.integrationProductSupplierErp,
    { eager: true },
  )
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'id' })
  supplier?: Supplier;

  constructor(partial: Partial<IntegrationProductSupplierErp>) {
    Object.assign(this, partial);
  }
}
