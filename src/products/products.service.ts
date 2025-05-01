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
import { CategoriesService } from './categories/categories.service';
import { ReturnNumberProductsByCategoryDto } from './dto/return-number-products-category.dto';
import { ReturnPaginatedDto } from 'src/dtos/return-paginated.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
  ) { }

  async countByCategory(categoryId: number): Promise<number> {
    return await this.productsRepository.count({
      where: {
        categoryId,
      },
    });
  }

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
    if (createProductDto.categoryId) {
      try {
        await this.categoriesService.findOne(createProductDto.categoryId);
      } catch (error) {
        throw new NotFoundException('Category id does not exist!');
      }
    }

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

  async findAllWithPagination(
    search?: string,
    take = 10,
    page = 1,
  ): Promise<ReturnPaginatedDto<Product>> {
    try {
      const skip = (page - 1) * take;

      const [products, total] = await this.productsRepository.findAndCount({
        where: search ? { name: ILike(`%${search}%`) } : undefined,
        relations: {
          category: true,
        },
        take,
        skip,
      });

      return new ReturnPaginatedDto(products, total);
    } catch (error) {
      throw new BadRequestException('Error find products');
    }
  }

  async findByName(name: string): Promise<Product[]> {
    try {
      return await this.productsRepository.findBy({ name: ILike(`%${name}%`) });
    } catch (error) {
      throw new NotFoundException('Product not found');
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

  async remove(id: number) {
    const product = await this.findOne(id);

    return await this.productsRepository.softRemove(product);
  }

  async restore(id: number) {
    await this.productsRepository.restore(id);

    return await this.findOne(id);
  }
}
