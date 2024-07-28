import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePurchaseOrder1722188460980
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS purchase_order (
        id INT NOT NULL AUTO_INCREMENT,
        supplier_id INT NOT NULL,
        order_number INT,
        tracking_code VARCHAR(255),
        purchase_order_status_id  INT NOT NULL,
        discount DECIMAL(10, 2),
        shipping_cost DECIMAL(10, 2),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (supplier_id) REFERENCES supplier(id),
        FOREIGN KEY (purchase_order_status_id) REFERENCES purchase_order_status(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS purchase_order;`);
  }
}
