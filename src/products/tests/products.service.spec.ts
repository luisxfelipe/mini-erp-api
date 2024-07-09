import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { ILike, In, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CategoriesService } from './../../categories/categories.service';
import { categoryMock } from './../../categories/mocks/category.mock';
import { productMock } from '../mocks/product.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { returnDeleteMock } from './../../mocks/return-delete.mock';
import { createProductMock } from '../mocks/create-product.mock';
import { NotFoundException } from '@nestjs/common';
import { updateProductMock } from '../mocks/update-product.mock';
import { ReturnProductsPaginatedMock } from '../mocks/return-produts-paginated.mock';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: CategoriesService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findAndCount: jest.fn().mockResolvedValue([[productMock], 1]),
            findOneOrFail: jest.fn().mockResolvedValue(productMock),
            create: jest.fn().mockReturnValue(productMock),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(categoriesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = await service.findAll();

      expect(products).toEqual([productMock]);
    });

    it('should return an array of products with relations', async () => {
      const spy = jest.spyOn(repository, 'find');
      const products = await service.findAll([], true);

      expect(products).toEqual([productMock]);
      expect(spy.mock.calls[0][0]).toEqual({
        relations: {
          category: true,
        },
      });
    });

    it('should return an array of products with relations and productIds', async () => {
      const spy = jest.spyOn(repository, 'find');
      const products = await service.findAll([1], true);

      expect(products).toEqual([productMock]);
      expect(spy.mock.calls[0][0]).toEqual({
        where: {
          id: In([1]),
        },
        relations: {
          category: true,
        },
      });
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      const products = await service.findAll();

      expect(products).toEqual([]);
    });
  });

  describe('findAllPaginated', () => {
    it('should return an array of products', async () => {
      const products = await service.findAllPage();

      expect(products).toEqual(ReturnProductsPaginatedMock);
    });

    it('should return an array of products paginated', async () => {
      const takeMock = 10;
      const pageMock = 1;
      const productsPagination = await service.findAllPage(
        undefined,
        takeMock,
        pageMock,
      );

      expect(productsPagination).toEqual(ReturnProductsPaginatedMock);
      expect(productsPagination.total).toEqual(
        ReturnProductsPaginatedMock.total,
      );
    });

    it('should return an array of products paginated send search', async () => {
      const searchMock = 'search';
      const spy = jest.spyOn(repository, 'findAndCount');
      await service.findAllPage(searchMock);

      expect(spy.mock.calls[0][0].where).toEqual({
        name: ILike(`%${searchMock}%`),
      });
    });
  });

  describe('findOne', () => {
    it('should return a product without relations', async () => {
      const spy = jest.spyOn(repository, 'findOneOrFail');
      const product = await service.findOne(productMock.id);

      expect(product).toEqual(productMock);
      expect(spy.mock.calls[0][0]).toEqual({
        where: {
          id: productMock.id,
        },
      });
    });

    it('should return a product with relations', async () => {
      const spy = jest.spyOn(repository, 'findOneOrFail');
      const product = await service.findOne(productMock.id, true);

      expect(product).toEqual(productMock);
      expect(spy.mock.calls[0][0]).toEqual({
        where: {
          id: productMock.id,
        },
        relations: ['category'],
      });
    });

    it('should throw an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(service.findOne(productMock.id)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const product = await service.create(createProductMock);

      expect(product).toEqual(productMock);
    });

    it('should throw an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      await expect(service.create(productMock)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should return an error when product does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(
        service.update(productMock.id, updateProductMock),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update a product', async () => {
      const product = await service.update(productMock.id, updateProductMock);

      expect(product).toEqual(productMock);
    });

    it('should throw an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      await expect(
        service.update(productMock.id, updateProductMock),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should return an error when product does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(service.remove(productMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should remove a product', async () => {
      const product = await service.remove(productMock.id);

      expect(product).toEqual(returnDeleteMock);
    });
  });
});
