import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductVariation } from './product-variations/entities/product-variation.entity';
import { Category } from './categories/entities/category.entity';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { ProductVariationsController } from './product-variations/product-variations.controller';
import { ProductVariationsService } from './product-variations/product-variations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, ProductVariation])],
  controllers: [
    CategoriesController,
    ProductsController,
    ProductVariationsController,
  ],
  providers: [CategoriesService, ProductsService, ProductVariationsService],
  exports: [ProductsService, ProductVariationsService],
})
export class ProductsModule {}
