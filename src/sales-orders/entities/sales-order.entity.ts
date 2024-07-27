import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sales_order' })
export class SalesOrder {
  @PrimaryGeneratedColumn()
  id: number;
}
