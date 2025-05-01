import { Category } from '../categories/entities/category.entity';
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
import { ProductVariation } from '../product-variations/entities/product-variation.entity';
import { PurchaseOrderItem } from './../../purchase-orders/purchase-order-items/entities/purchase-order-item.entity';
import { SaleOrderItem } from './../../sale-orders/sale-order-items/entities/sale-order-item.entity';
import { StockItem } from './../../stock-items/entities/stock-item.entity';
import { Pricing } from 'src/pricing/entities/pricing.entity';
import { IntegrationProductSupplierErp } from 'src/integration-product-supplier-erp/entities/integration-product-supplier-erp.entity';

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

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

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

  @OneToMany(
    () => SaleOrderItem,
    (saleOrderItem: SaleOrderItem) => saleOrderItem.product,
  )
  saleOrderItem?: SaleOrderItem;

  @OneToMany(() => StockItem, (stockItem: StockItem) => stockItem.product)
  stockItems?: PurchaseOrderItem[];

  @OneToMany(() => Pricing, (pricing: Pricing) => pricing.product)
  pricing?: Pricing;

  @OneToMany(
    () => IntegrationProductSupplierErp,
    (integrationProductSupplierErp: IntegrationProductSupplierErp) =>
      integrationProductSupplierErp.product,
  )
  integrationProductSupplierErp?: IntegrationProductSupplierErp;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
