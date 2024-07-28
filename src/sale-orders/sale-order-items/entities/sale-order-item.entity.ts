import { Product } from './../../../products/entities/product.entity';
import { ProductVariation } from './../../../products/product-variations/entities/product-variation.entity';
import { SaleOrder } from './../../../sale-orders/entities/sale-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sale_order_item' })
export class SaleOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sale_order_id', nullable: false })
  saleOrderId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'product_variation_id', nullable: false })
  productVariationId: number;

  @Column({
    type: 'decimal',
    name: 'price',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(
    () => SaleOrder,
    (saleOrder: SaleOrder) => saleOrder.saleOrderItems,
  )
  @JoinColumn({ name: 'sale_order_id', referencedColumnName: 'id' })
  saleOrder?: SaleOrder;

  @ManyToOne(() => Product, (product: Product) => product.saleOrderItem)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;

  @ManyToOne(
    () => ProductVariation,
    (productVariation: ProductVariation) => productVariation.saleOrderItems,
  )
  @JoinColumn({ name: 'product_variation_id', referencedColumnName: 'id' })
  productVariation?: ProductVariation;
}
