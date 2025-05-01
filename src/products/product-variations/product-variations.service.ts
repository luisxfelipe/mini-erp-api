import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariation } from './entities/product-variation.entity';
import { Repository } from 'typeorm';
import { CreateProductVariationDto } from './dto/create-product-variation.dto';
import { UpdateProductVariationDto } from './dto/update-product-variation.dto';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductVariationsService {
  constructor(
    @InjectRepository(ProductVariation)
    private productsVariationRepository: Repository<ProductVariation>,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
  ) { }

  async create(
    productId: number,
    createProductVariationDto: CreateProductVariationDto,
  ): Promise<ProductVariation> {
    await this.productsService.findOne(productId);

    return await this.productsVariationRepository.save(
      this.productsVariationRepository.create({
        ...createProductVariationDto,
        productId,
      }),
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

    await this.findOne(id);

    return await this.productsVariationRepository.save({
      ...productVariation,
      ...updateProductVariationDto,
    });
  }

  async remove(id: number) {
    const productVariation = await this.findOne(id);

    return await this.productsVariationRepository.softRemove(productVariation);
  }

  async restore(id: number) {
    await this.productsVariationRepository.restore(id);

    return await this.findOne(id);
  }
}
