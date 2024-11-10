import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductVariationsService } from './product-variations.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { ReturnProductVariationDto } from './dto/return-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';

@Controller('products/:productId/product-variations')
@ApiTags('Product variations')
export class ProductVariationsController {
  constructor(
    private readonly productVariationsService: ProductVariationsService,
  ) {}

  @Post()
  async create(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createProductVariationDto: CreateProductVariationDto,
  ): Promise<ReturnProductVariationDto> {
    return new ReturnProductVariationDto(
      await this.productVariationsService.create(
        productId,
        createProductVariationDto,
      ),
    );
  }

  @Get()
  async findAll(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ReturnProductVariationDto[]> {
    return (await this.productVariationsService.findAll(productId)).map(
      (productVariation) => new ReturnProductVariationDto(productVariation),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnProductVariationDto> {
    return new ReturnProductVariationDto(
      await this.productVariationsService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductVariationDto: UpdateProductVariationDto,
  ): Promise<ReturnProductVariationDto> {
    return new ReturnProductVariationDto(
      await this.productVariationsService.update(id, updateProductVariationDto),
    );
  }
}
