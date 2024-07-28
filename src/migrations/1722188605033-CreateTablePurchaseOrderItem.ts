import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePurchaseOrderItem1722188605033
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS purchase_order_item (
        id INT NOT NULL AUTO_INCREMENT,
        purchase_order_id INT NOT NULL,
        product_id INT NOT NULL,
        product_variation_id INT NOT NULL,
        supplier_product_code VARCHAR(255),
        purchase_order_item_status_id INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        product_link TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (purchase_order_id) REFERENCES purchase_order(id),
        FOREIGN KEY (product_id) REFERENCES product(id),
        FOREIGN KEY (product_variation_id) REFERENCES product_variation(id),
        FOREIGN KEY (purchase_order_item_status_id) REFERENCES purchase_order_item_status(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS purchase_order_item;`);
  }
}
