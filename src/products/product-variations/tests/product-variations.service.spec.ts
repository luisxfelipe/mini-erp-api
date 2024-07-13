import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariationsService } from '../product-variations.service';
import { Repository } from 'typeorm';
import { ProductVariation } from '../entities/product-variation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productVariationMock } from './mocks/product-variation.mock';
import { createProductVariationMock } from './mocks/create-product-variation.mock';
import { updateProductVariationMock } from './mocks/update-product-variation.mock';
import { NotFoundException } from '@nestjs/common';

describe('ProductVariationsService', () => {
  let service: ProductVariationsService;
  let repository: Repository<ProductVariation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductVariationsService,
        {
          provide: getRepositoryToken(ProductVariation),
          useValue: {
            find: jest.fn().mockResolvedValue([productVariationMock]),
            findBy: jest.fn().mockResolvedValue([productVariationMock]),
            findOneOrFail: jest.fn().mockResolvedValue(productVariationMock),
            create: jest.fn().mockReturnValue(productVariationMock),
            save: jest.fn().mockResolvedValue(productVariationMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductVariationsService>(ProductVariationsService);
    repository = module.get<Repository<ProductVariation>>(
      getRepositoryToken(ProductVariation),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of product variations', async () => {
      const productVariations = await service.findAll(
        productVariationMock.productId,
      );

      expect(productVariations).toEqual([productVariationMock]);
    });
  });

  describe('findOne', () => {
    it('should return a product variation', async () => {
      const spy = jest.spyOn(repository, 'findOneOrFail');
      const product = await service.findOne(productVariationMock.id);

      expect(product).toEqual(productVariationMock);
      expect(spy.mock.calls[0][0]).toEqual({
        where: {
          id: productVariationMock.id,
        },
      });
    });

    it('should throw an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(service.findOne(productVariationMock.id)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create a new product variation', async () => {
      const product = await service.create(createProductVariationMock);

      expect(product).toEqual(productVariationMock);
    });

    it('should throw an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      await expect(service.create(productVariationMock)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should return an error when product variation does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(
        service.update(productVariationMock.id, updateProductVariationMock),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update a product', async () => {
      const product = await service.update(
        productVariationMock.id,
        updateProductVariationMock,
      );

      expect(product).toEqual(productVariationMock);
    });

    it('should throw an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      await expect(
        service.update(productVariationMock.id, updateProductVariationMock),
      ).rejects.toThrow();
    });
  });
});
