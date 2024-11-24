import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveInStockInTheSupplierColumnInIntegrationProductSupplierErpTable1732465140375
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE integration_product_supplier_erp
      DROP COLUMN in_stock_in_the_supplier;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE integration_product_supplier_erp
      ADD COLUMN in_stock_in_the_supplier BOOLEAN NOT NULL DEFAULT FALSE;
    `);
  }
}
