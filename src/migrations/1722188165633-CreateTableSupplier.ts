import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSupplier1722188165633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS supplier (
          id INT NOT NULL AUTO_INCREMENT,
          corporate_name VARCHAR(255) NOT NULL,
          trade_name VARCHAR(255) NOT NULL,
          cnpj VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(11),
          website VARCHAR(255),
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          UNIQUE INDEX cnpj_UNIQUE (cnpj ASC) VISIBLE,
          UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS supplier;`);
  }
}
