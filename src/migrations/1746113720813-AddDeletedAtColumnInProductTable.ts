import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedAtColumnInProductTable1746113720813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionar coluna deletedAt à tabela products
        await queryRunner.addColumn('product', new TableColumn({
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover coluna deletedAt da tabela products
        await queryRunner.dropColumn('product', 'deleted_at');
    }

}
