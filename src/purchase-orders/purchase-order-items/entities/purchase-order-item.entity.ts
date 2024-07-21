import { Product } from 'src/products/entities/product.entity';
import { ProductVariation } from 'src/products/product-variations/entities/product-variation.entity';
import { PurchaseOrder } from 'src/purchase-orders/entities/purchase-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'purchase_order_item' })
export class PurchaseOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purchase_order_id', nullable: false })
  purchaseOrderId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'product_variation_id', nullable: false })
  productVariationId: number;

  @Column({ name: 'supplier_product_code' })
  supplierProductCode: string;

  @Column({
    type: 'decimal',
    name: 'price',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    name: 'quantity',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  quantity: number;

  @Column({ name: 'product_link' })
  product_link: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(
    () => PurchaseOrder,
    (purchaseOrder: PurchaseOrder) => purchaseOrder.purchaseOrderItems,
  )
  @JoinColumn({ name: 'purchase_order_id', referencedColumnName: 'id' })
  purchaseOrder?: PurchaseOrder;

  @ManyToOne(() => Product, (product: Product) => product.purchaseOrderItem)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;

  @ManyToOne(
    () => ProductVariation,
    (productVariation: ProductVariation) => productVariation,
  )
  @JoinColumn({ name: 'product_variation_id', referencedColumnName: 'id' })
  productVariation?: ProductVariation;

  constructor(partial: Partial<PurchaseOrderItem>) {
    Object.assign(this, partial);
  }
}
