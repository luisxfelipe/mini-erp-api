import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePurchaseOrderItem1721509713068
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS purchase_order_item (
          id INT NOT NULL AUTO_INCREMENT,
          purchase_order_id INT NOT NULL,
          product_id INT NOT NULL,
          product_variation_id INT NOT NULL,
          supplier_product_code VARCHAR(255),
          price DECIMAL(10, 2) NOT NULL,
          quantity INT NOT NULL,
          product_link TEXT,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          FOREIGN KEY (purchase_order_id) REFERENCES purchase_order(id),
          FOREIGN KEY (product_id) REFERENCES product(id),
          FOREIGN KEY (product_variation_id) REFERENCES product_variation(id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS purchase_order_item;`);
  }
}
