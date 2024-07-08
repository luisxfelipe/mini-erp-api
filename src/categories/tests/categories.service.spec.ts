import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './../categories.service';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { ProductsService } from './../../products/products.service';
import { returnNumberProductsByCategoryDtoMock } from './../../products/mocks/return-number-products-category-dto.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../mocks/category.mock';
import { returnDeleteMock } from './../../mocks/return-delete.mock';
import { ReturnCategoryDto } from '../dto/return-category.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { createCategoryMock } from '../mocks/create-category.mock';
import { updateCategoryMock } from '../mocks/update-category.mock';
import { productMock } from './../../products/mocks/product.mock';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: Repository<Category>;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: ProductsService,
          useValue: {
            countProductsByCategory: jest
              .fn()
              .mockResolvedValue([returnNumberProductsByCategoryDtoMock]),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn().mockResolvedValue([categoryMock]),
            findByName: jest.fn().mockResolvedValue(categoryMock),
            findOneOrFail: jest.fn().mockResolvedValue(categoryMock),
            findOneByOrFail: jest.fn().mockResolvedValue(categoryMock),
            create: jest.fn().mockReturnValue(categoryMock),
            save: jest.fn().mockResolvedValue(categoryMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(productsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = await service.findAll();

      console.log('categories: ', categories);
      console.log('outro: ', [
        new ReturnCategoryDto(
          categoryMock,
          returnNumberProductsByCategoryDtoMock.numberProducts,
        ),
      ]);

      expect(categories).toEqual([
        new ReturnCategoryDto(
          categoryMock,
          returnNumberProductsByCategoryDtoMock.numberProducts,
        ),
      ]);
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      const categories = await service.findAll();

      expect(categories).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const category = await service.findOne(categoryMock.id);

      expect(category).toEqual(categoryMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findOne(categoryMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findOneByName', () => {
    it('should return a category', async () => {
      const category = await service.findOneByName(categoryMock.name);

      expect(category).toEqual(categoryMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findOneByName(categoryMock.name)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should return an error if category already exists', async () => {
      expect(service.create(createCategoryMock)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create a category', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockResolvedValueOnce(undefined);

      const category = await service.create(createCategoryMock);

      expect(category).toEqual(categoryMock);
    });

    it('should return an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.create(createCategoryMock)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const spy = jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValueOnce(categoryMock);
      const category = await service.update(
        categoryMock.id,
        updateCategoryMock,
      );

      expect(category).toEqual(categoryMock);
      expect(spy).toBeCalledTimes(1);
    });

    it('should send new category to save', async () => {
      const spy = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(categoryMock);
      await service.update(categoryMock.id, updateCategoryMock);

      expect(spy.mock.calls[0][0]).toEqual({
        ...categoryMock,
        ...updateCategoryMock,
      });
    });
  });

  describe('remove', () => {
    it('should return an error if category does not exists', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.remove(categoryMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return relations in findOne', async () => {
      const spy = jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValueOnce(categoryMock);

      await service.remove(categoryMock.id);

      expect(spy.mock.calls[0][0]).toEqual({
        where: { id: categoryMock.id },
        relations: {
          products: true,
        },
      });
    });

    it('should return an error if category has products', async () => {
      jest.spyOn(repository, 'findOneOrFail').mockResolvedValueOnce({
        ...categoryMock,
        products: [productMock],
      });

      expect(service.remove(categoryMock.id)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should delete a category', async () => {
      const category = await service.remove(categoryMock.id);

      expect(category).toEqual(returnDeleteMock);
    });
  });
});
