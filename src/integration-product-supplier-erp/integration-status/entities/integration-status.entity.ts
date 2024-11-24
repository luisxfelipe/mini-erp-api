import { IntegrationProductSupplierErp } from 'src/integration-product-supplier-erp/entities/integration-product-supplier-erp.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'integration_status' })
export class IntegrationStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @OneToMany(
    () => IntegrationProductSupplierErp,
    (integrationProductSupplierErp: IntegrationProductSupplierErp) =>
      integrationProductSupplierErp.integrationStatus,
  )
  integrationProductSupplierErpList?: IntegrationProductSupplierErp[];

  constructor(partial: Partial<IntegrationStatus>) {
    Object.assign(this, partial);
  }
}
