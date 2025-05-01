import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
import { StockItem } from './../../../stock-items/entities/stock-item.entity';
import { Pricing } from 'src/pricing/entities/pricing.entity';
import { IntegrationProductSupplierErp } from 'src/integration-product-supplier-erp/entities/integration-product-supplier-erp.entity';

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

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

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

  @OneToMany(() => StockItem, (stockItem: StockItem) => stockItem.product)
  stockItems?: PurchaseOrderItem[];

  @OneToMany(() => Pricing, (pricing: Pricing) => pricing.productVariation)
  pricing?: Pricing[];

  @OneToMany(
    () => IntegrationProductSupplierErp,
    (integrationProductSupplierErp) =>
      integrationProductSupplierErp.productVariation,
  )
  integrationProductSupplierErp?: IntegrationProductSupplierErp[];

  constructor(partial: Partial<ProductVariation>) {
    Object.assign(this, partial);
  }
}
