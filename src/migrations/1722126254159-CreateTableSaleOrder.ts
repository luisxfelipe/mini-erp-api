import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSaleOrder1722126254159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS sale_order (
          id INT NOT NULL AUTO_INCREMENT,
          order_number varchar(255),
          tracking_code VARCHAR(255),
          platform_id INT NOT NULL,
          status_id  INT NOT NULL,
          discount DECIMAL(10, 2),
          shipping_cost DECIMAL(10, 2),
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          FOREIGN KEY (platform_id) REFERENCES sale_platform(id),
          FOREIGN KEY (status_id) REFERENCES sale_status(id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS sale_order;`);
  }
}
