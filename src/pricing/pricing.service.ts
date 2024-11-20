import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { Pricing } from './entities/pricing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformsService } from 'src/platforms/platforms.service';
import { ProductsService } from 'src/products/products.service';
import { ProductVariationsService } from 'src/products/product-variations/product-variations.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductVariation } from 'src/products/product-variations/entities/product-variation.entity';
import { CreateSalePriceDto } from './dto/create-sale-price.dto';
import { SalesPlatformCommissionsService } from './sales-platform-commissions/sales-platform-commissions.service';
import { FindPricingByProductPlatformDto } from './dto/find-pricing-by-product-platform.dto';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(Pricing)
    private readonly repository: Repository<Pricing>,
    @Inject(PlatformsService)
    private readonly platformsService: PlatformsService,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(ProductVariationsService)
    private readonly productVariationsService: ProductVariationsService,
    @Inject(SalesPlatformCommissionsService)
    private readonly salesPlatformCommissionsService: SalesPlatformCommissionsService,
  ) {}

  async calculateSalePrice(
    createSalePriceDto: CreateSalePriceDto,
  ): Promise<number> {
    const pricing = await this.findOne(createSalePriceDto.pricingId);

    const salePlatformCommission =
      await this.salesPlatformCommissionsService.findOneByPlatformId(
        pricing.salePlatformId,
      );

    if (!salePlatformCommission) {
      throw new BadRequestException('Sale platform commission not found');
    }

    const costPrice = createSalePriceDto.costPrice;
    const additionalProfit =
      createSalePriceDto.additionalProfit || Number(pricing.additionalProfit);
    const costPerItemSold = Number(
      createSalePriceDto.costPerItemSold ||
        salePlatformCommission.costPerItemSold,
    );

    const costs = costPrice + additionalProfit + costPerItemSold;

    const defaultProfitPercentage =
      createSalePriceDto.profitPercentage || pricing.profitPercentage;

    const commissionPercentage = salePlatformCommission.commissionPercentage;

    const profitPercentage =
      (100 - (defaultProfitPercentage + commissionPercentage)) / 100;

    const salePrice = Number((costs / profitPercentage).toFixed(2));

    return salePrice;
  }

  async create(createPricingDto: CreatePricingDto): Promise<Pricing> {
    await this.productsService.findOne(createPricingDto.productId);
    await this.productVariationsService.findOne(
      createPricingDto.productVariationId,
    );
    const platform = await this.platformsService.findOne(
      createPricingDto.salePlatformId,
    );

    const product = await this.productsService.findOne(
      createPricingDto.productId,
    );
    const productVariation = await this.productVariationsService.findOne(
      createPricingDto.productVariationId,
    );

    const existingPricing = await this.repository.findOne({
      where: {
        productId: createPricingDto.productId,
        productVariationId: createPricingDto.productVariationId,
        salePlatformId: createPricingDto.salePlatformId,
      },
    });

    if (existingPricing) {
      throw new BadRequestException('Pricing already exists');
    }

    if (product.id !== productVariation.productId) {
      throw new BadRequestException('Variation is not related to the product');
    }

    const result = await this.repository.save(
      this.repository.create({ ...createPricingDto }),
    );

    return {
      ...result,
      product,
      productVariation,
      salePlatform: platform,
    };
  }

  async findAll(): Promise<Pricing[]> {
    const options = {
      relations: ['product', 'productVariation', 'salePlatform'],
    };
    return await this.repository.find(options);
  }

  async findOne(id: number): Promise<Pricing> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Pricing not found');
    }
  }

  async findOneByProductAndPlatformId(
    findPricingByProductPlatformDto: FindPricingByProductPlatformDto,
  ): Promise<Pricing> {
    await this.productsService.findOne(
      findPricingByProductPlatformDto.productId,
    );
    await this.productVariationsService.findOne(
      findPricingByProductPlatformDto.productVariationId,
    );
    await this.platformsService.findOne(
      findPricingByProductPlatformDto.salePlatformId,
    );

    try {
      return await this.repository.findOneOrFail({
        where: findPricingByProductPlatformDto,
      });
    } catch (error) {
      throw new NotFoundException('Pricing not found');
    }
  }

  async update(
    id: number,
    updatePricingDto: UpdatePricingDto,
  ): Promise<Pricing> {
    const pricing = await this.findOne(id).catch(() => undefined);

    let product: Product;
    let productVariation: ProductVariation;

    if (!pricing) {
      throw new NotFoundException('Pricing not found');
    }

    if (updatePricingDto.productId) {
      product = await this.productsService.findOne(updatePricingDto.productId);
    }

    if (updatePricingDto.productVariationId) {
      productVariation = await this.productVariationsService.findOne(
        updatePricingDto.productVariationId,
      );
    }

    if (product || productVariation) {
      if (
        product &&
        productVariation &&
        product.id !== productVariation.productId
      ) {
        throw new BadRequestException(
          'Variation is not related to the product',
        );
      }
      if (product && !productVariation && pricing.productId !== product.id) {
        throw new BadRequestException('Product is not related to variation');
      }
      if (
        productVariation &&
        !product &&
        pricing.product.id !== productVariation.productId
      ) {
        throw new BadRequestException(
          'Variation is not related to the product',
        );
      }
    }

    try {
      await this.repository.update({ id }, { ...updatePricingDto });
      return await this.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
