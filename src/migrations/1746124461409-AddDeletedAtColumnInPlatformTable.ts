import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedAtColumnInPlatformTable1746124461409 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionar coluna deletedAt à tabela sale_platform
        await queryRunner.addColumn('sale_platform', new TableColumn({
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover coluna deletedAt da tabela sale_platform
        await queryRunner.dropColumn('sale_platform', 'deleted_at');
    }

}
