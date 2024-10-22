import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIdentifierAndIdentifierTypeToStockItemTable1729552665713
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE stock_item
      ADD COLUMN identifier VARCHAR(255) AFTER stock_item_status_id,
      ADD COLUMN identifier_type_id INT AFTER identifier;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE stock_item
      DROP COLUMN identifier,
      DROP COLUMN identifier_type_id;

    `);
  }
}
