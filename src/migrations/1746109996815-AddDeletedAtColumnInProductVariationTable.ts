import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSoftDeleteToProductVariations1746109996815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionar coluna deletedAt à tabela product_variations
        await queryRunner.addColumn('product_variation', new TableColumn({
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover coluna deletedAt da tabela product_variations
        await queryRunner.dropColumn('product_variation', 'deleted_at');
    }

}
