import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'supplier' })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'corporate_name', nullable: false })
  corporateName: string;

  @Column({ name: 'trade_name', nullable: false })
  tradeName: string;

  @Column({ name: 'cnpj', unique: true })
  cnpj: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({
    name: 'phone',
    length: 11,
  })
  phone: string;

  @Column({ name: 'website' })
  website: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<Supplier>) {
    Object.assign(this, partial);
  }
}