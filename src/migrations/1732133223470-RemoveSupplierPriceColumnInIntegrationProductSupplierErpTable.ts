import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSupplierPriceColumnInIntegrationProductSupplierErpTable1732133223470
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(
      'integration_product_supplier_erp',
    );
    const columnSupplierPrice = table.findColumnByName('supplier_price');

    if (columnSupplierPrice) {
      await queryRunner.dropColumn(table, columnSupplierPrice);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(
      'integration_product_supplier_erp',
    );
    const columnSupplierPrice = table.findColumnByName('supplier_price');

    if (!columnSupplierPrice) {
      await queryRunner.query(`
        ALTER TABLE integration_product_supplier_erp
        ADD COLUMN supplier_price DECIMAL(10, 2) NOT NULL AFTER supplier_id;
      `);
    }
  }
}
