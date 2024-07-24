import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderItem } from '../entities/purchase-order-item.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { purchaseOrderItemMock } from './mocks/purchase-order-item.mock';
import { PurchaseOrderItemsService } from '../purchase-order-items.service';
import { createPurchaseOrderItemMock } from './mocks/create-purchase-order-item.mock';
import { updatePurchaseOrderItemMock } from './mocks/update-purchase-order-item.mock';
import { PurchaseOrdersService } from './../../../purchase-orders/purchase-orders.service';
import { ProductsService } from './../../../products/products.service';
import { ProductVariationsService } from './../../../products/product-variations/product-variations.service';
import { productMock } from './../../../products/tests/mocks/product.mock';
import { productVariationMock } from './../../../products/product-variations/tests/mocks/product-variation.mock';
import { purchaseOrderMock } from './../../../purchase-orders/tests/mocks/purchase-order.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PurchaseOrderItemsService', () => {
  let service: PurchaseOrderItemsService;
  let repository: Repository<PurchaseOrderItem>;
  let purchaseOrdersService: PurchaseOrdersService;
  let productsService: ProductsService;
  let productVariationsService: ProductVariationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderItemsService,
        {
          provide: PurchaseOrdersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(purchaseOrderItemMock),
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
          provide: getRepositoryToken(PurchaseOrderItem),
          useValue: {
            findBy: jest.fn().mockResolvedValue([purchaseOrderItemMock]),
            findOneOrFail: jest.fn().mockResolvedValue(purchaseOrderItemMock),
            findOneBy: jest.fn().mockResolvedValue(purchaseOrderItemMock),
            create: jest.fn().mockReturnValue(purchaseOrderItemMock),
            save: jest.fn().mockResolvedValue(purchaseOrderItemMock),
            update: jest.fn().mockResolvedValue(purchaseOrderItemMock),
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderItemsService>(PurchaseOrderItemsService);
    repository = module.get<Repository<PurchaseOrderItem>>(
      getRepositoryToken(PurchaseOrderItem),
    );

    purchaseOrdersService = module.get<PurchaseOrdersService>(
      PurchaseOrdersService,
    );
    productsService = module.get<ProductsService>(ProductsService);
    productVariationsService = module.get<ProductVariationsService>(
      ProductVariationsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(purchaseOrdersService).toBeDefined();
    expect(productsService).toBeDefined();
    expect(productVariationsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a purchase order item', async () => {
      jest
        .spyOn(purchaseOrdersService, 'findOne')
        .mockResolvedValueOnce(purchaseOrderMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockResolvedValueOnce(productVariationMock);
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);
      jest
        .spyOn(repository, 'create')
        .mockReturnValueOnce(purchaseOrderItemMock);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(purchaseOrderItemMock);

      const result = await service.create(
        purchaseOrderItemMock.purchaseOrderId,
        createPurchaseOrderItemMock,
      );
      expect(result).toEqual(purchaseOrderItemMock);
    });

    it('should throw an error if the purchase order does not exist', async () => {
      jest
        .spyOn(purchaseOrdersService, 'findOne')
        .mockRejectedValueOnce(new Error('Purchase order not found'));
      await expect(
        service.create(purchaseOrderMock.id, createPurchaseOrderItemMock),
      ).rejects.toThrow('Purchase order not found');
    });

    it('should throw an error if the product does not exist', async () => {
      jest
        .spyOn(purchaseOrdersService, 'findOne')
        .mockResolvedValueOnce(purchaseOrderMock);
      jest
        .spyOn(productsService, 'findOne')
        .mockRejectedValueOnce(new Error('Product not found'));
      await expect(
        service.create(purchaseOrderMock.id, createPurchaseOrderItemMock),
      ).rejects.toThrow('Product not found');
    });

    it('should throw an error if the product variation does not exist', async () => {
      jest
        .spyOn(purchaseOrdersService, 'findOne')
        .mockResolvedValueOnce(purchaseOrderMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockRejectedValueOnce(new Error('Product variation not found'));
      await expect(
        service.create(purchaseOrderMock.id, createPurchaseOrderItemMock),
      ).rejects.toThrow('Product variation not found');
    });

    it('should throw an error if the purchase order item already exists', async () => {
      jest
        .spyOn(purchaseOrdersService, 'findOne')
        .mockResolvedValueOnce(purchaseOrderMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockResolvedValueOnce(productVariationMock);
      jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValueOnce(purchaseOrderItemMock);
      await expect(
        service.create(purchaseOrderMock.id, createPurchaseOrderItemMock),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of purchase order items', async () => {
      jest
        .spyOn(repository, 'findBy')
        .mockResolvedValueOnce([purchaseOrderItemMock]);
      const result = await service.findAll(
        purchaseOrderItemMock.purchaseOrderId,
      );
      expect(result).toEqual([purchaseOrderItemMock]);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order item', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValueOnce(purchaseOrderItemMock);
      const result = await service.findOne(purchaseOrderItemMock.id, true);
      expect(result).toEqual(purchaseOrderItemMock);
    });

    it('should throw an error if the purchase order item does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('Purchase order item not found'));
      await expect(
        service.findOne(purchaseOrderItemMock.id, true),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a purchase order item', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValueOnce(purchaseOrderItemMock);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(purchaseOrderItemMock);
      const result = await service.update(
        purchaseOrderItemMock.id,
        updatePurchaseOrderItemMock,
      );
      expect(result).toEqual(purchaseOrderItemMock);
    });

    it('should throw an error if the purchase order item does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('Purchase order item not found'));
      await expect(
        service.update(purchaseOrderItemMock.id, updatePurchaseOrderItemMock),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
