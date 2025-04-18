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
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
  async findAllPage(
    @Query('search') search?: string,
    @Query('take') take?: number,
    @Query('page') page?: number,
  ): Promise<any> {
    const productsPaginated = await this.productsService.findAllWithPagination(
      search,
      take,
      page,
    );

    return new PaginationDto(
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
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.productsService.remove(id);
  }
}
