import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariation } from './entities/product-variation.entity';
import { Repository } from 'typeorm';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';

@Injectable()
export class ProductVariationsService {
  constructor(
    @InjectRepository(ProductVariation)
    private productsVariationRepository: Repository<ProductVariation>,
  ) {}

  async create(
    createProductVariationDto: CreateProductVariationDto,
  ): Promise<ProductVariation> {
    try {
      await this.findOne(createProductVariationDto.productId);
    } catch (error) {
      throw new NotFoundException('Product id does not exist!');
    }

    return await this.productsVariationRepository.save(
      this.productsVariationRepository.create(createProductVariationDto),
    );
  }

  async findAll(productId: number): Promise<ProductVariation[]> {
    return await this.productsVariationRepository.findBy({ productId });
  }

  async findOne(id: number): Promise<ProductVariation> {
    try {
      return await this.productsVariationRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Product variation not found');
    }
  }

  async update(
    id: number,
    updateProductVariationDto: UpdateProductVariationDto,
  ): Promise<ProductVariation> {
    const productVariation = await this.findOne(id);

    await this.findOne(updateProductVariationDto.productId);

    return await this.productsVariationRepository.save({
      ...productVariation,
      ...updateProductVariationDto,
    });
  }
}
