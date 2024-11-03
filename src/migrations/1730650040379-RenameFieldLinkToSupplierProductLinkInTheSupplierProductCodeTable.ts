import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameFieldLinkToSupplierProductLinkInTheSupplierProductCodeTable1730650040379
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE supplier_product_code
        RENAME COLUMN link TO supplier_product_link;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE supplier_product_code
      RENAME COLUMN supplier_product_link TO link;
    `);
  }
}
