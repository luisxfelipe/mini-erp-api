import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePurchaseRefund1722188687116
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS purchase_order_refund (
        id INT NOT NULL AUTO_INCREMENT,
        purchase_order_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        reason VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (purchase_order_id) REFERENCES purchase_order(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS purchase_order_refund;`);
  }
}
