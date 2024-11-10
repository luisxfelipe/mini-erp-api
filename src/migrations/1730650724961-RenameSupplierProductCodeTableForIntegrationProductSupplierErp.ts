import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameSupplierProductCodeTableForIntegrationProductSupplierErp1730650724961
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE supplier_product_code
      RENAME TO integration_product_supplier_erp;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE integration_product_supplier_erp
      RENAME TO supplier_product_code;
    `);
  }
}
