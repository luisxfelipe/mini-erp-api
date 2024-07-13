import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCategoryIdToNullableInProductTable1720567922923
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'product',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'product',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'int',
        isNullable: false,
      }),
    );
  }
}
