import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSaleItem1722189042062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS sale_order_item (
        id INT NOT NULL AUTO_INCREMENT,
        sale_order_id INT NOT NULL,
        product_id INT NOT NULL,
        product_variation_id INT NOT NULL,
        sale_order_item_status_id INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (sale_order_id) REFERENCES sale_order(id),
        FOREIGN KEY (product_id) REFERENCES product(id),
        FOREIGN KEY (product_variation_id) REFERENCES product_variation(id),
        FOREIGN KEY (sale_order_item_status_id) REFERENCES sale_order_item_status(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS sale_order_item;`);
  }
}
