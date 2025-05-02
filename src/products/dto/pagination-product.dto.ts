import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto, PaginationMetaDto } from '../../dtos/pagination.dto';
import { ReturnProductDto } from './return-product.dto';

export class PaginationProductDto extends PaginationDto<ReturnProductDto> {
    @ApiProperty({
        type: PaginationMetaDto
    })
    meta: PaginationMetaDto;

    @ApiProperty({
        type: [ReturnProductDto]
    })
    data: ReturnProductDto[];
}