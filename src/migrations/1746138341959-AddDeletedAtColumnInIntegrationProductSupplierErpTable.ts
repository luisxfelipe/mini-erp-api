import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedAtColumnInIntegrationProductSupplierErpTable1746138341959 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionar a coluna deleted_at na tabela de integração de produtos e fornecedores
        await queryRunner.addColumn(
            'integration_product_supplier_erp',
            new TableColumn({
                name: 'deleted_at',
                type: 'timestamp',
                isNullable: true,
                default: null,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a coluna deleted_at na tabela de integração de produtos e fornecedores
        await queryRunner.dropColumn('integration_product_supplier_erp', 'deleted_at');
    }

}
