import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierProductCodeDto } from './dto/create-supplier-product-code.dto';
import { UpdateSupplierProductCodeDto } from './dto/update-supplier-product-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierProductCode } from './entities/supplier-product-code.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductVariationsService } from 'src/products/product-variations/product-variations.service';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductVariation } from 'src/products/product-variations/entities/product-variation.entity';

@Injectable()
export class SupplierProductCodesService {
  constructor(
    @InjectRepository(SupplierProductCode)
    private readonly repository: Repository<SupplierProductCode>,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(ProductVariationsService)
    private readonly productVariationsService: ProductVariationsService,
    @Inject(SuppliersService)
    private readonly suppliersService: SuppliersService,
  ) {}

  async create(
    createSupplierProductCodeDto: CreateSupplierProductCodeDto,
  ): Promise<SupplierProductCode> {
    const product = await this.productsService.findOne(
      createSupplierProductCodeDto.productId,
    );
    const productVariation = await this.productVariationsService.findOne(
      createSupplierProductCodeDto.productVariationId,
    );
    const supplier = await this.suppliersService.findOne(
      createSupplierProductCodeDto.supplierId,
    );

    const existingSupplierProductCode = await this.repository.findOne({
      where: {
        productId: product.id,
        productVariationId: productVariation.id,
        supplierId: supplier.id,
      },
    });

    if (existingSupplierProductCode) {
      throw new BadRequestException('Supplier product code already exists');
    }

    if (product.id !== productVariation.productId) {
      throw new BadRequestException('Variation is not related to the product');
    }

    const supplierProductCode = await this.repository.save(
      this.repository.create(createSupplierProductCodeDto),
    );
    return {
      ...supplierProductCode,
      product,
      productVariation,
      supplier,
    };
  }

  async findAll(): Promise<SupplierProductCode[]> {
    const findOptions = {
      relations: ['product', 'productVariation', 'supplier'],
    };
    return await this.repository.find(findOptions);
  }

  async findOne(id: number): Promise<SupplierProductCode> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Supplier product code not found');
    }
  }

  async update(
    id: number,
    updateSupplierProductCodeDto: UpdateSupplierProductCodeDto,
  ): Promise<SupplierProductCode> {
    const supplierProductCode = await this.findOne(id).catch(() => undefined);
    if (!supplierProductCode) {
      throw new NotFoundException('Supplier product code not found');
    }

    let product: Product;
    let productVariation: ProductVariation;

    if (updateSupplierProductCodeDto.productId) {
      product = await this.productsService.findOne(
        updateSupplierProductCodeDto.productId,
      );
    }

    if (updateSupplierProductCodeDto.productVariationId) {
      productVariation = await this.productVariationsService.findOne(
        updateSupplierProductCodeDto.productVariationId,
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
        supplierProductCode.productId !== product.id
      ) {
        throw new BadRequestException('Product is not related to variation');
      }
      if (
        productVariation &&
        !product &&
        supplierProductCode.product.id !== productVariation.productId
      ) {
        throw new BadRequestException(
          'Variation is not related to the product',
        );
      }
    }

    try {
      await this.repository.update({ id }, { ...updateSupplierProductCodeDto });
      return await this.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
