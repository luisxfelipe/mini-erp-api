import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveBatchNumberColumnFromStockItem1729453094879
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('stock_item');

    const column = table.findColumnByName('batch_number');

    if (column) {
      await queryRunner.dropColumn(table, column);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('stock_item');

    const column = table.findColumnByName('batch_number');

    if (!column) {
      await queryRunner.addColumn(
        table,
        new TableColumn({
          name: 'batch_number',
          type: 'varchar',
          isNullable: false,
        }),
      );
    }
  }
}
