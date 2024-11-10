import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePricing1729993640226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS pricing (
        id INT NOT NULL AUTO_INCREMENT,
        product_id INT NOT NULL,
        product_variation_id INT NOT NULL,
        sale_platform_id INT NOT NULL,
        cost_price DECIMAL(10, 2) NOT NULL,
        sale_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (product_id) REFERENCES product(id),
        FOREIGN KEY (product_variation_id) REFERENCES product_variation(id),
        FOREIGN KEY (sale_platform_id) REFERENCES sale_platform(id),
        CONSTRAINT unique_product_variation_sale_platform UNIQUE (product_id, product_variation_id, sale_platform_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS pricing;`);
  }
}
