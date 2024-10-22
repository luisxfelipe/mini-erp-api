import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableStockItemIdentifier1722210612176
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE stock_item
      ADD COLUMN identifier VARCHAR(255) AFTER stock_item_status_id,
      ADD COLUMN identifier_type_id INT AFTER identifier;

      ALTER TABLE stock_item
      ADD CONSTRAINT uc_stock_item_identifier UNIQUE (identifier, identifier_type_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE stock_item
      DROP CONSTRAINT uc_stock_item_identifier;

      ALTER TABLE stock_item
      DROP COLUMN identifier_type_id,
      DROP COLUMN identifier;
    `);
  }
}
