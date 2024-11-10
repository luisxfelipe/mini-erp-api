import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeOrderNumberColumnInSaleOrderTable1729205508881
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('sale_order');
    const column = table.findColumnByName('date');

    if (!column) {
      await queryRunner.query(`
          ALTER TABLE sale_order
          ADD COLUMN date DATE NOT NULL AFTER id,
          CHANGE COLUMN order_number order_number VARCHAR(255);
        `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('sale_order');
    const column = table.findColumnByName('date');

    if (column) {
      await queryRunner.query(`
          ALTER TABLE sale_order
          DROP COLUMN date,
          CHANGE COLUMN order_number order_number INT;
        `);
    }
  }
}
