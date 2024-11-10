import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSupplierPriceColumnInIntegrationProductSupplierErpTable1730675782475
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE integration_product_supplier_erp
      ADD COLUMN supplier_price DECIMAL(10, 2) NOT NULL AFTER supplier_id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE integration_product_supplier_erp
      DROP COLUMN supplier_price;
    `);
  }
}
