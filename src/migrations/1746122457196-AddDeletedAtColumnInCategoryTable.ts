import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedAtColumnInCategoryTable1746122457196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionar coluna deletedAt à tabela category
        await queryRunner.addColumn('category', new TableColumn({
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover coluna deletedAt da tabela category
        await queryRunner.dropColumn('category', 'deleted_at');
    }

}
