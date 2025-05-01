import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIntegrationProductSupplierErpDto } from './dto/create-integration-product-supplier-erp.dto';
import { UpdateIntegrationProductSupplierErpDto } from './dto/update-integration-product-supplier-erp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegrationProductSupplierErp } from './entities/integration-product-supplier-erp.entity';
import { In, Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductVariationsService } from 'src/products/product-variations/product-variations.service';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductVariation } from 'src/products/product-variations/entities/product-variation.entity';
import { ReturnPaginatedDto } from 'src/dtos/return-paginated.dto';

@Injectable()
export class IntegrationProductSupplierErpService {
  constructor(
    @InjectRepository(IntegrationProductSupplierErp)
    private readonly repository: Repository<IntegrationProductSupplierErp>,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(ProductVariationsService)
    private readonly productVariationsService: ProductVariationsService,
    @Inject(SuppliersService)
    private readonly suppliersService: SuppliersService,
  ) { }

  async create(
    createIntegrationProductSupplierErpDto: CreateIntegrationProductSupplierErpDto,
  ): Promise<IntegrationProductSupplierErp> {
    const product = await this.productsService.findOne(
      createIntegrationProductSupplierErpDto.productId,
    );
    const productVariation = await this.productVariationsService.findOne(
      createIntegrationProductSupplierErpDto.productVariationId,
    );
    const supplier = await this.suppliersService.findOne(
      createIntegrationProductSupplierErpDto.supplierId,
    );

    const existingIntegrationProductSupplierErp = await this.repository.findOne(
      {
        where: {
          productId: product.id,
          productVariationId: productVariation.id,
          supplierId: supplier.id,
        },
      },
    );

    if (existingIntegrationProductSupplierErp) {
      throw new BadRequestException('Integration already exists');
    }

    if (product.id !== productVariation.productId) {
      throw new BadRequestException('Variation is not related to the product');
    }

    const integrationProductSupplierErp = await this.repository.save(
      this.repository.create(createIntegrationProductSupplierErpDto),
    );
    return {
      ...integrationProductSupplierErp,
      product,
      productVariation,
      supplier,
    };
  }

  async findAll(): Promise<IntegrationProductSupplierErp[]> {
    const findOptions = {
      relations: ['product', 'productVariation', 'supplier'],
    };
    return await this.repository.find(findOptions);
  }

  async findAllWithPagination(
    search?: string,
    take = 10,
    page = 1,
  ): Promise<any> {
    try {
      const skip = (page - 1) * take;

      const products = await this.productsService.findByName(search);
      const productIds = products.map((product) => product.id);

      if (products && products.length == 0) {
        return new NotFoundException('Product not found');
      }

      const findOptions = {
        where: {
          productId: In(productIds),
        },
        take,
        skip,
        relations: ['product', 'productVariation', 'supplier'],
      };

      const [IntegrationProductSupplierErp, total] =
        await this.repository.findAndCount(findOptions);

      return new ReturnPaginatedDto(IntegrationProductSupplierErp, total);

      // return new ReturnPaginatedDto(IntegrationProductSupplierErp, total);
    } catch (error) {
      throw new BadRequestException('Error find products');
    }
  }

  async findBySupplierId(
    supplierId: number,
  ): Promise<IntegrationProductSupplierErp[]> {
    const findOptions = {
      where: { supplierId },
      relations: ['product', 'productVariation', 'supplier'],
    };
    return await this.repository.find(findOptions);
  }

  async findOne(id: number): Promise<IntegrationProductSupplierErp> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Integration product supplier not found');
    }
  }

  async update(
    id: number,
    updateIntegrationProductSupplierErpDto: UpdateIntegrationProductSupplierErpDto,
  ): Promise<IntegrationProductSupplierErp> {
    const integrationProductSupplierErp = await this.findOne(id).catch(
      () => undefined,
    );
    if (!integrationProductSupplierErp) {
      throw new NotFoundException('Integration product supplier not found');
    }

    let product: Product;
    let productVariation: ProductVariation;

    if (updateIntegrationProductSupplierErpDto.productId) {
      product = await this.productsService.findOne(
        updateIntegrationProductSupplierErpDto.productId,
      );
    }

    if (updateIntegrationProductSupplierErpDto.productVariationId) {
      productVariation = await this.productVariationsService.findOne(
        updateIntegrationProductSupplierErpDto.productVariationId,
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
      if (
        product &&
        !productVariation &&
        integrationProductSupplierErp.productId !== product.id
      ) {
        throw new BadRequestException('Product is not related to variation');
      }
      if (
        productVariation &&
        !product &&
        integrationProductSupplierErp.product.id !== productVariation.productId
      ) {
        throw new BadRequestException(
          'Variation is not related to the product',
        );
      }
    }

    try {
      await this.repository.update(
        { id },
        { ...updateIntegrationProductSupplierErpDto },
      );
      return await this.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<IntegrationProductSupplierErp> {
    const integrationProductSupplierErp = await this.findOne(id)

    return await this.repository.softRemove(integrationProductSupplierErp);
  }

  async restore(id: number): Promise<IntegrationProductSupplierErp> {
    await this.repository.restore(id);
    return await this.findOne(id);
  }
}
