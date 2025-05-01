import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products.service';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.findOneByName(createCategoryDto.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException('Category already exists');
    }

    return await this.repository.save(
      this.repository.create(createCategoryDto),
    );
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findOne(id: number, isRelations?: boolean): Promise<Category> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
        relations: {
          products: isRelations ? true : false,
        },
      });
    } catch (error) {
      throw new NotFoundException('Category not found');
    }
  }

  async findOneByName(name: string): Promise<Category> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Category not found');
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    return await this.repository.save({
      ...category,
      ...updateCategoryDto,
    });
  }

  async remove(id: number): Promise<Category> {
    const category = await this.findOne(id, true);

    const quantityProducts = this.productsService.countByCategory(id);

    if ((await quantityProducts) > 0) {
      throw new BadRequestException('Cannot remove a category with products associated');
    }

    return await this.repository.softRemove(category);
  }

  async restore(id: number): Promise<Category> {
    await this.repository.restore(id);

    return await this.findOne(id);
  }
}
