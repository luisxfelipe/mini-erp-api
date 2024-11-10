import { Product } from './../../products/entities/product.entity';
import { ProductVariation } from './../../products/product-variations/entities/product-variation.entity';
import { PurchaseOrderItem } from './../../purchase-orders/purchase-order-items/entities/purchase-order-item.entity';
import { SaleOrderItem } from './../../sale-orders/sale-order-items/entities/sale-order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StockItemStatus } from '../stock-item-status/entities/stock-item-status.entity';
import { StockItemIdentifierType } from '../stock-item-identifier-types/entities/stock-item-identifier-type.entity';

@Entity({ name: 'stock_item' })
export class StockItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purchase_order_item_id', nullable: false })
  purchaseOrderItemId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'product_variation_id', nullable: false })
  productVariationId: number;

  @Column({ name: 'sale_order_item_id' })
  saleOrderItemId: number;

  @Column({ name: 'stock_item_status_id', nullable: false })
  stockItemStatusId: number;

  @Column({ name: 'identifier' })
  identifier: string;

  @Column({ name: 'identifier_type_id' })
  identifierTypeId: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToOne(
    () => PurchaseOrderItem,
    (purchase_order_item) => purchase_order_item.id,
    { nullable: false },
  )
  @JoinColumn({ name: 'purchase_order_item_id', referencedColumnName: 'id' })
  purchaseOrderItem?: number;

  @ManyToOne(() => Product, (product: Product) => product.stockItems)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;

  @ManyToOne(
    () => ProductVariation,
    (productVariation: ProductVariation) => productVariation.stockItems,
  )
  @JoinColumn({ name: 'product_variation_id', referencedColumnName: 'id' })
  productVariation?: ProductVariation;

  @OneToOne(() => SaleOrderItem, (saleOrderItem) => saleOrderItem.id)
  @JoinColumn({ name: 'sale_order_item_id', referencedColumnName: 'id' })
  saleOrderItem?: number;

  @ManyToOne(
    () => StockItemStatus,
    (stockItemStatus: StockItemStatus) => stockItemStatus.stockItems,
  )
  @JoinColumn({ name: 'stock_item_status_id', referencedColumnName: 'id' })
  stockItemStatus?: StockItemStatus;

  @ManyToOne(
    () => StockItemIdentifierType,
    (stockItemIdentifierType: StockItemIdentifierType) =>
      stockItemIdentifierType.stockItems,
  )
  @JoinColumn({
    name: 'identifier_type_id',
    referencedColumnName: 'id',
  })
  stockItemIdentifierType?: StockItemIdentifierType;

  constructor(partial: Partial<StockItem>) {
    Object.assign(this, partial);
  }
}
