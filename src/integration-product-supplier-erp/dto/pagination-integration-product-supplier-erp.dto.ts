import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto, PaginationMetaDto } from '../../dtos/pagination.dto';
import { ReturnIntegrationProductSupplierErpDto } from './return-integration-product-supplier-erp.dto';

export class PaginationIntegrationProductSupplierErpDto extends PaginationDto<ReturnIntegrationProductSupplierErpDto> {
    @ApiProperty({
        type: PaginationMetaDto
    })
    meta: PaginationMetaDto;

    @ApiProperty({
        type: [ReturnIntegrationProductSupplierErpDto]
    })
    data: ReturnIntegrationProductSupplierErpDto[];
}