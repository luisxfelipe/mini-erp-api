import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIntegrationStatusColumnInIntegrationProductSupplierErpTable1732372450806
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE integration_product_supplier_erp 
      ADD COLUMN status_id INT NOT NULL DEFAULT 1 AFTER supplier_product_code,
      ADD CONSTRAINT fk_integration_status
      FOREIGN KEY (status_id)
      REFERENCES integration_status (id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE integration_product_supplier_erp 
          DROP COLUMN status_id;
        `);
  }
}
