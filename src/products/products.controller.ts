import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ReturnProductDto } from './dto/return-product.dto';
import { PaginationDto, PaginationMetaDto } from './../dtos/pagination.dto';
import { DeleteResult } from 'typeorm';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationProductDto } from './dto/pagination-product.dto';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ReturnProductDto> {
    return new ReturnProductDto(
      await this.productsService.create(createProductDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    return (await this.productsService.findAll([], true)).map(
      (product) => new ReturnProductDto(product),
    );
  }

  @Get('/pages')
  @ApiQuery({ name: 'search', required: false, description: 'Termo de busca para filtrar produtos' })
  @ApiQuery({ name: 'take', required: false, description: 'Quantidade de itens por página' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de produtos',
    type: PaginationProductDto
  })
  async findAllPage(
    @Query('search') search?: string,
    @Query('take') take?: number,
    @Query('page') page?: number,
  ): Promise<PaginationDto<ReturnProductDto>> {
    const productsPaginated = await this.productsService.findAllWithPagination(
      search,
      take,
      page,
    );

    return new PaginationDto<ReturnProductDto>(
      new PaginationMetaDto(
        Number(take),
        productsPaginated.total,
        Number(page),
        Math.ceil(productsPaginated.total / take),
      ),
      productsPaginated.data.map((product) => new ReturnProductDto(product)),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnProductDto> {
    return new ReturnProductDto(await this.productsService.findOne(id, true));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ReturnProductDto> {
    return new ReturnProductDto(
      await this.productsService.update(id, updateProductDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ReturnProductDto> {
    return new ReturnProductDto(
      await this.productsService.remove(id),
    );
  }

  @Post(':id/restore')
  async restore(@Param('id', ParseIntPipe) id: number): Promise<ReturnProductDto> {
    return new ReturnProductDto(
      await this.productsService.restore(id),
    );
  }
}
