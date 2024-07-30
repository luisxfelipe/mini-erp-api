import { StockItemIdentifier } from 'src/stock-items/stock-item-identifiers/entities/stock-item-identifier.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock_item_identifier_type')
export class StockItemIdentifierType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(
    () => StockItemIdentifier,
    (stockItemIdentifier: StockItemIdentifier) =>
      stockItemIdentifier.stockItemIdentifierType,
  )
  stockItemIdentifiers?: StockItemIdentifier[];

  constructor(partial: Partial<StockItemIdentifierType>) {
    Object.assign(this, partial);
  }
}
