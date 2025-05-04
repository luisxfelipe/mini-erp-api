import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto, PaginationMetaDto } from '../../dtos/pagination.dto';
import { ReturnPricingDto } from './return-pricing.dto';

export class PaginationPricingDto extends PaginationDto<ReturnPricingDto> {
    @ApiProperty({
        type: PaginationMetaDto
    })
    meta: PaginationMetaDto;

    @ApiProperty({
        type: [ReturnPricingDto]
    })
    data: ReturnPricingDto[];
}