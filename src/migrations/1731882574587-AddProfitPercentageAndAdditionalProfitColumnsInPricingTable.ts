import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfitPercentageAndAdditionalProfitColumnsInPricingTable1731882574587
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pricing
      ADD COLUMN profit_percentage INTEGER NOT NULL AFTER cost_price,
      ADD COLUMN additional_profit DECIMAL(10, 2) AFTER profit_percentage;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pricing
      DROP COLUMN profit_percentage,
      DROP COLUMN additional_profit;
    `);
  }
}
