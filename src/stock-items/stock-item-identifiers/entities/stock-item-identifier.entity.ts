import { StockItemIdentifierType } from 'src/stock-items/stock-item-identifier-types/entities/stock-item-identifier-type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock_item_identifier')
export class StockItemIdentifier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_item_identifier_type_id', nullable: false })
  stockItemIdentifierTypeId: number;

  @Column({ name: 'value', nullable: false })
  value: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(
    () => StockItemIdentifierType,
    (stockItemIdentifierType: StockItemIdentifierType) =>
      stockItemIdentifierType.stockItemIdentifiers,
  )
  @JoinColumn({
    name: 'stock_item_identifier_type_id',
    referencedColumnName: 'id',
  })
  stockItemIdentifierType?: StockItemIdentifierType;

  constructor(partial: Partial<StockItemIdentifier>) {
    Object.assign(this, partial);
  }
}
