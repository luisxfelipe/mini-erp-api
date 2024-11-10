import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintInPurchaseOrderItemIdToStockItemTable1729639506743
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE stock_item ADD CONSTRAINT purchase_order_item_id UNIQUE (purchase_order_item_id);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE stock_item DROP CONSTRAINT purchase_order_item_id`,
    );
  }
}
