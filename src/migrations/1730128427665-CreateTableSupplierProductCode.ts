import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSupplierProductCode1730128427665
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS supplier_product_code (
        id INT NOT NULL AUTO_INCREMENT,
        product_id INT NOT NULL,
        product_variation_id INT NOT NULL,
        supplier_id INT NOT NULL,
        supplier_product_code VARCHAR(255) NOT NULL,
        link TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (product_id) REFERENCES product (id),
        FOREIGN KEY (product_variation_id) REFERENCES product_variation (id),
        FOREIGN KEY (supplier_id) REFERENCES supplier (id),
        CONSTRAINT unique_product_variation_supplier UNIQUE (product_id, product_variation_id, supplier_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE supplier_product_code;
    `);
  }
}
