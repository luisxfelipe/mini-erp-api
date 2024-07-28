import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSaleRefund1722173117492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS sale_order_refund (
          id INT NOT NULL AUTO_INCREMENT,
          sale_order_id INT NOT NULL,
          amount DECIMAL(10, 2) NOT NULL,
          reason VARCHAR(255) NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          FOREIGN KEY (sale_order_id) REFERENCES sale_order(id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS sale_order_refund;`);
  }
}
