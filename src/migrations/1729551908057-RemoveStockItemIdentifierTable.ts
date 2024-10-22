import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveStockItemIdentifierTable1729551908057
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('stock_item_identifier');

    if (table) {
      await queryRunner.dropTable(table);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS stock_item_identifier (
        id INT NOT NULL AUTO_INCREMENT,
        stock_item_identifier_type_id INT NOT NULL,
        value VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (stock_item_identifier_type_id) REFERENCES stock_item_identifier_type(id)
      );
    `);
  }
}
