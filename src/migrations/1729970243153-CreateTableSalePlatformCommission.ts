import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSalePlatformCommission1729970243153
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS sale_platform_commission (
        id INT NOT NULL AUTO_INCREMENT,
        sale_platform_id INT NOT NULL,
        commission_percentage INTEGER NOT NULL,
        max_commission DECIMAL(10, 2),
        cost_per_item_sold DECIMAL(10, 2),
        default_profit_percentage INTEGER NOT NULL,
        additional_profit DECIMAL(10, 2),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (sale_platform_id) REFERENCES sale_platform(id),
        UNIQUE KEY (sale_platform_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS sale_platform_commission;`);
  }
}
