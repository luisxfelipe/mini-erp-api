import { SaleOrderItemStatus } from './../../../sale-orders/sale-order-item-status/entities/sale-order-item-status.entity';
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

  @Column({ name: 'sale_order_item_status_id', nullable: false })
  saleOrderItemStatusId: number;

  @Column({
    type: 'decimal',
    name: 'price',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

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

  @ManyToOne(
    () => SaleOrderItemStatus,
    (saleOrderItemStatus: SaleOrderItemStatus) =>
      saleOrderItemStatus.saleOrderItems,
  )
  @JoinColumn({
    name: 'sale_order_item_status_id',
    referencedColumnName: 'id',
  })
  saleOrderItemStatus?: SaleOrderItemStatus;
}
