import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveManufactureDateAndExpirationDateColumnsFromStockItem1729459818810
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('stock_item');
    const columnManufactureDate = table.findColumnByName('manufacture_date');
    const columnExpirationDate = table.findColumnByName('expiration_date');

    if (columnManufactureDate) {
      await queryRunner.dropColumn(table, columnManufactureDate);
    }

    if (columnExpirationDate) {
      await queryRunner.dropColumn(table, columnExpirationDate);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('stock_item');
    const columnManufactureDate = table.findColumnByName('manufacture_date');
    const columnExpirationDate = table.findColumnByName('expiration_date');

    if (!columnManufactureDate) {
      await queryRunner.query(
        `ALTER TABLE "stock_item" ADD "manufacture_date" DATE`,
      );
    }

    if (!columnExpirationDate) {
      await queryRunner.query(
        `ALTER TABLE "stock_item" ADD "expiration_date" DATE`,
      );
    }
  }
}
