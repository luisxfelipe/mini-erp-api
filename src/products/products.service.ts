import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeleteResult, ILike, In, Repository } from 'typeorm';
import { CategoriesService } from './../categories/categories.service';
import { ReturnNumberProductsByCategoryDto } from './dto/return-number-products-category.dto';
import { PaginationDto, PaginationMetaDto } from './../dtos/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
  ) {}

  async countProductsByCategory(): Promise<
    ReturnNumberProductsByCategoryDto[]
  > {
    return await this.productsRepository
      .createQueryBuilder('product')
      .select('product.category_id, COUNT(*) as total')
      .groupBy('product.category_id')
      .getRawMany();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.categoriesService.findOne(createProductDto.categoryId);

    return await this.productsRepository.save(
      this.productsRepository.create(createProductDto),
    );
  }

  async findAll(
    productIds?: number[],
    isFindRelations?: boolean,
  ): Promise<Product[]> {
    let findOptions = {};

    if (productIds && productIds.length > 0) {
      findOptions = {
        where: {
          id: In(productIds),
        },
      };
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          category: true,
        },
      };
    }

    const products = await this.productsRepository.find(findOptions);

    return products;
  }

  async findAllPage(
    search?: string,
    take = 10,
    page = 1,
  ): Promise<PaginationDto<Product[]>> {
    try {
      const skip = (page - 1) * take;

      const [products, total] = await this.productsRepository.findAndCount({
        where: search ? { name: ILike(`%${search}%`) } : undefined,
        take,
        skip,
      });

      return new PaginationDto(
        new PaginationMetaDto(
          Number(take),
          total,
          Number(page),
          Math.ceil(total / take),
        ),
        products,
      );
    } catch (error) {
      throw new BadRequestException('Error find products');
    }
  }

  async findOne(id: number, isRelation?: boolean): Promise<Product> {
    try {
      return await this.productsRepository.findOneOrFail({
        where: { id },
        ...(isRelation && { relations: ['category'] }),
      });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    await this.categoriesService.findOne(updateProductDto.categoryId);

    return await this.productsRepository.save({
      ...product,
      ...updateProductDto,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return this.productsRepository.delete(id);
  }
}
