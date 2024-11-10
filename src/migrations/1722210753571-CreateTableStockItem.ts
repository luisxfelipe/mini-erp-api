import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableStockItem1722210753571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS stock_item (
        id INT NOT NULL AUTO_INCREMENT,
        purchase_order_item_id INT NOT NULL,
        product_id INT NOT NULL,
        product_variation_id INT NOT NULL,
        sale_order_item_id INT,
        stock_item_status_id INT NOT NULL,
        identifier VARCHAR(255),
        identifier_type_id INT,
        batch_number int NOT NULL,
        manufacture_date DATE,
        expiration_date DATE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT uc_stock_item_identifier UNIQUE (identifier, identifier_type_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS stock_item;`);
  }
}
