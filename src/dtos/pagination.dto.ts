import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Número de itens por página',
    example: 10
  })
  itemsPerPage: number;

  @ApiProperty({
    description: 'Total de itens',
    example: 100
  })
  totalItems: number;

  @ApiProperty({
    description: 'Página atual',
    example: 1
  })
  currentPage: number;

  @ApiProperty({
    description: 'Total de páginas',
    example: 10
  })
  totalPages: number;

  constructor(
    itemsPerPage: number,
    totalItems: number,
    currentPage: number,
    totalPages: number,
  ) {
    this.itemsPerPage = itemsPerPage;
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
  }
}

export class PaginationDto<T> {
  @ApiProperty({
    description: 'Metadados da paginação',
    type: PaginationMetaDto
  })
  meta: PaginationMetaDto;

  @ApiProperty({
    description: 'Dados paginados',
    isArray: true
  })
  data: T[];

  constructor(pagationMega: PaginationMetaDto, data: T[]) {
    this.meta = pagationMega;
    this.data = data;
  }
}