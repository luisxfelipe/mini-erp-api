import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSupplierProductCode1732460725279
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS integration_product_supplier_erp (
        id INT NOT NULL AUTO_INCREMENT,
        product_id INT NOT NULL,
        product_variation_id INT NOT NULL,
        supplier_id INT NOT NULL,
        supplier_product_code VARCHAR(255) NOT NULL,
        status_id INT NOT NULL,
        in_stock_in_the_supplier BOOLEAN NOT NULL,
        supplier_product_link TEXT,
        bling_product_id bigint NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (product_id) REFERENCES product (id),
        FOREIGN KEY (product_variation_id) REFERENCES product_variation (id),
        FOREIGN KEY (supplier_id) REFERENCES supplier (id),
        FOREIGN KEY (status_id) REFERENCES integration_status (id),
        CONSTRAINT unique_product_variation_supplier UNIQUE (product_id, product_variation_id, supplier_id),
        CONSTRAINT unique_bling_product_id UNIQUE (bling_product_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE integration_product_supplier_erp;
    `);
  }
}
