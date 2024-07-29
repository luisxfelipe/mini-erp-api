import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableStockItemIdentifierRelation1722212081691
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS stock_item_identifier_relation (
        id INT NOT NULL AUTO_INCREMENT,
        stock_item_id INT NOT NULL,
        stock_item_identifier_id INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (stock_item_id) REFERENCES stock_item(id),
        FOREIGN KEY (stock_item_identifier_id) REFERENCES stock_item_identifier(id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS stock_item_identifier_relation;`,
    );
  }
}
