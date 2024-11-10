import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeOrderNumberColumnInPurchaseOrderTable1726188388227
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('purchase_order');
    const column = table.findColumnByName('date');

    if (!column) {
      await queryRunner.query(`
        ALTER TABLE purchase_order 
        ADD COLUMN date DATE NOT NULL AFTER id, 
        CHANGE COLUMN order_number order_number VARCHAR(255);
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('purchase_order');
    const column = table.findColumnByName('date');

    if (column) {
      await queryRunner.query(`
        ALTER TABLE purchase_order 
        DROP COLUMN date, 
        CHANGE COLUMN order_number order_number INT;
      `);
    }
  }
}
