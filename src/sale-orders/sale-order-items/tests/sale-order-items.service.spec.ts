import { Repository } from 'typeorm';
import { SaleOrderItemsService } from '../sale-order-items.service';
import { SaleOrderItem } from '../entities/sale-order-item.entity';
import { ProductsService } from './../../../products/products.service';
import { ProductVariationsService } from './../../../products/product-variations/product-variations.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrdersService } from './../../../sale-orders/sale-orders.service';
import { saleOrderItemMock } from './mocks/purchase-sale-item.mock';
import { productMock } from './../../../products/tests/mocks/product.mock';
import { productVariationMock } from '../../../products/product-variations/tests/mocks/product-variation.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { saleOrderMock } from './../../../sale-orders/tests/mocks/sale-order.mock';
import { createSaleOrderItemMock } from './mocks/create-purchase-sale-item.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { updateSaleOrderItemMock } from './mocks/update-purchase-sale-item.mock';

describe('SaleOrderItemsService', () => {
  let service: SaleOrderItemsService;
  let repository: Repository<SaleOrderItem>;
  let saleOrdersService: SaleOrdersService;
  let productsService: ProductsService;
  let productVariationsService: ProductVariationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleOrderItemsService,
        {
          provide: SaleOrdersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(saleOrderItemMock),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: ProductVariationsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(productVariationMock),
          },
        },
        {
          provide: getRepositoryToken(SaleOrderItem),
          useValue: {
            findBy: jest.fn().mockResolvedValue([saleOrderItemMock]),
            findOneOrFail: jest.fn().mockResolvedValue(saleOrderItemMock),
            findOneBy: jest.fn().mockResolvedValue(saleOrderItemMock),
            create: jest.fn().mockReturnValue(saleOrderItemMock),
            save: jest.fn().mockResolvedValue(saleOrderItemMock),
            update: jest.fn().mockResolvedValue(saleOrderItemMock),
          },
        },
      ],
    }).compile();

    service = module.get<SaleOrderItemsService>(SaleOrderItemsService);
    repository = module.get<Repository<SaleOrderItem>>(
      getRepositoryToken(SaleOrderItem),
    );

    saleOrdersService = module.get<SaleOrdersService>(SaleOrdersService);
    productsService = module.get<ProductsService>(ProductsService);
    productVariationsService = module.get<ProductVariationsService>(
      ProductVariationsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(saleOrdersService).toBeDefined();
    expect(productsService).toBeDefined();
    expect(productVariationsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a sale order item', async () => {
      jest
        .spyOn(saleOrdersService, 'findOne')
        .mockResolvedValueOnce(saleOrderMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockResolvedValueOnce(productVariationMock);
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'create').mockReturnValueOnce(saleOrderItemMock);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(saleOrderItemMock);

      const result = await service.create(
        saleOrderItemMock.saleOrderId,
        createSaleOrderItemMock,
      );
      expect(result).toEqual(saleOrderItemMock);
    });

    it('should throw an error if the purchase order does not exist', async () => {
      jest
        .spyOn(saleOrdersService, 'findOne')
        .mockRejectedValueOnce(new Error('Sale order not found'));
      await expect(
        service.create(saleOrderMock.id, createSaleOrderItemMock),
      ).rejects.toThrow('Sale order not found');
    });

    it('should throw an error if the product does not exist', async () => {
      jest
        .spyOn(saleOrdersService, 'findOne')
        .mockResolvedValueOnce(saleOrderMock);
      jest
        .spyOn(productsService, 'findOne')
        .mockRejectedValueOnce(new Error('Product not found'));
      await expect(
        service.create(saleOrderMock.id, createSaleOrderItemMock),
      ).rejects.toThrow('Product not found');
    });

    it('should throw an error if the product variation does not exist', async () => {
      jest
        .spyOn(saleOrdersService, 'findOne')
        .mockResolvedValueOnce(saleOrderMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockRejectedValueOnce(new Error('Product variation not found'));
      await expect(
        service.create(saleOrderMock.id, createSaleOrderItemMock),
      ).rejects.toThrow('Product variation not found');
    });

    it('should throw an error if the sale order item already exists', async () => {
      jest
        .spyOn(saleOrdersService, 'findOne')
        .mockResolvedValueOnce(saleOrderMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockResolvedValueOnce(productVariationMock);
      jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValueOnce(saleOrderItemMock);
      await expect(
        service.create(saleOrderMock.id, createSaleOrderItemMock),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of sale order items', async () => {
      jest
        .spyOn(repository, 'findBy')
        .mockResolvedValueOnce([saleOrderItemMock]);
      const result = await service.findAll(saleOrderItemMock.saleOrderId);
      expect(result).toEqual([saleOrderItemMock]);
    });
  });

  describe('findOne', () => {
    it('should return a sale order item', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValueOnce(saleOrderItemMock);
      const result = await service.findOne(saleOrderItemMock.id, true);
      expect(result).toEqual(saleOrderItemMock);
    });

    it('should throw an error if the sale order item does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('sale order item not found'));
      await expect(service.findOne(saleOrderItemMock.id, true)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a sale order item', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValueOnce(saleOrderItemMock);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(saleOrderItemMock);
      const result = await service.update(
        saleOrderItemMock.id,
        updateSaleOrderItemMock,
      );
      expect(result).toEqual(saleOrderItemMock);
    });

    it('should throw an error if the sale order item does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('sale order item not found'));
      await expect(
        service.update(saleOrderItemMock.id, updateSaleOrderItemMock),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
