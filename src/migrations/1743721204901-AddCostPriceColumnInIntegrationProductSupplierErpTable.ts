import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCostPriceColumnInIntegrationProductSupplierErpTable1743721204901
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE integration_product_supplier_erp
            ADD COLUMN cost_price DECIMAL(10, 2) NOT NULL AFTER bling_product_id;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE integration_product_supplier_erp
            DROP COLUMN cost_price;
        `);
  }
}
