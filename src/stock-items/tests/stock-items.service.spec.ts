import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { StockItem } from '../entities/stock-item.entity';
import { createStockItemMock } from './mocks/create-stock-item.mock';
import { updateStockItemMock } from './mocks/update-stock-item.mock';
import { stockItemMock } from './mocks/stock-item.mock';
import { PurchaseOrderItemsService } from './../../purchase-orders/purchase-order-items/purchase-order-items.service';
import { ProductsService } from './../../products/products.service';
import { ProductVariationsService } from './../../products/product-variations/product-variations.service';
import { SaleOrderItemsService } from './../../sale-orders/sale-order-items/sale-order-items.service';
import { StockItemStatusService } from '../stock-item-status/stock-item-status.service';
import { StockItemsService } from '../stock-items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { purchaseOrderItemMock } from './../../purchase-orders/purchase-order-items/tests/mocks/purchase-order-item.mock';
import { productMock } from './../../products/tests/mocks/product.mock';
import { productVariationMock } from './../../products/product-variations/tests/mocks/product-variation.mock';
import { saleOrderItemMock } from './../../sale-orders/sale-order-items/tests/mocks/purchase-sale-item.mock';
import { stockItemStatusMock } from '../stock-item-status/tests/mocks/stock-item-status.mock';
import { NotFoundException } from '@nestjs/common';

describe('StockItemsService', () => {
  let service: StockItemsService;
  let repository: Repository<StockItem>;

  let purchaseOrderItemsService: PurchaseOrderItemsService;
  let productsService: ProductsService;
  let productVariationsService: ProductVariationsService;
  let saleOrderItemsService: SaleOrderItemsService;
  let stockItemStatusService: StockItemStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockItemsService,
        {
          provide: getRepositoryToken(StockItem),
          useValue: {
            find: jest.fn().mockResolvedValue([stockItemMock]),
            findOneOrFail: jest.fn().mockResolvedValue(stockItemMock),
            findOneByOrFail: jest.fn().mockResolvedValue(stockItemMock),
            create: jest.fn().mockReturnValue(stockItemMock),
            save: jest.fn().mockResolvedValue(stockItemMock),
          },
        },
        {
          provide: PurchaseOrderItemsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(stockItemMock),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(stockItemMock),
          },
        },
        {
          provide: ProductVariationsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(stockItemMock),
          },
        },
        {
          provide: SaleOrderItemsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(stockItemMock),
          },
        },
        {
          provide: StockItemStatusService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(stockItemMock),
          },
        },
      ],
    }).compile();

    service = module.get<StockItemsService>(StockItemsService);
    repository = module.get<Repository<StockItem>>(
      getRepositoryToken(StockItem),
    );

    purchaseOrderItemsService = module.get<PurchaseOrderItemsService>(
      PurchaseOrderItemsService,
    );
    productsService = module.get<ProductsService>(ProductsService);
    productVariationsService = module.get<ProductVariationsService>(
      ProductVariationsService,
    );
    saleOrderItemsService = module.get<SaleOrderItemsService>(
      SaleOrderItemsService,
    );
    stockItemStatusService = module.get<StockItemStatusService>(
      StockItemStatusService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();

    expect(purchaseOrderItemsService).toBeDefined();
    expect(productsService).toBeDefined();
    expect(productVariationsService).toBeDefined();
    expect(saleOrderItemsService).toBeDefined();
    expect(stockItemStatusService).toBeDefined();
  });

  describe('create', () => {
    it('should create a stock item', async () => {
      jest
        .spyOn(purchaseOrderItemsService, 'findOne')
        .mockResolvedValue(purchaseOrderItemMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValue(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockResolvedValue(productVariationMock);
      jest
        .spyOn(saleOrderItemsService, 'findOne')
        .mockResolvedValue(saleOrderItemMock);
      jest
        .spyOn(stockItemStatusService, 'findOne')
        .mockResolvedValue(stockItemStatusMock);
      const result = await service.create(createStockItemMock);
      expect(result).toEqual(stockItemMock);
    });

    it('should throw an error if purchase order item not found', async () => {
      jest
        .spyOn(purchaseOrderItemsService, 'findOne')
        .mockRejectedValueOnce(
          new NotFoundException('Purchase order item not found'),
        );
      await expect(service.create(createStockItemMock)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if product not found', async () => {
      jest
        .spyOn(purchaseOrderItemsService, 'findOne')
        .mockResolvedValueOnce(purchaseOrderItemMock);
      jest
        .spyOn(productsService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('Product not found'));
      await expect(service.create(createStockItemMock)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if product variation not found', async () => {
      jest
        .spyOn(purchaseOrderItemsService, 'findOne')
        .mockResolvedValueOnce(purchaseOrderItemMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockRejectedValueOnce(
          new NotFoundException('Product variation not found'),
        );
      await expect(service.create(createStockItemMock)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if sale order item not found', async () => {
      jest
        .spyOn(purchaseOrderItemsService, 'findOne')
        .mockResolvedValueOnce(purchaseOrderItemMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockResolvedValueOnce(productVariationMock);
      jest
        .spyOn(saleOrderItemsService, 'findOne')
        .mockRejectedValueOnce(
          new NotFoundException('Sale order item not found'),
        );
      await expect(service.create(createStockItemMock)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if stock item status not found', async () => {
      jest
        .spyOn(purchaseOrderItemsService, 'findOne')
        .mockResolvedValueOnce(purchaseOrderItemMock);
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(productMock);
      jest
        .spyOn(productVariationsService, 'findOne')
        .mockResolvedValueOnce(productVariationMock);
      jest
        .spyOn(saleOrderItemsService, 'findOne')
        .mockResolvedValueOnce(saleOrderItemMock);
      jest
        .spyOn(stockItemStatusService, 'findOne')
        .mockRejectedValueOnce(
          new NotFoundException('Stock item status not found'),
        );
      await expect(service.create(createStockItemMock)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of stock items', async () => {
      const result = await service.findAll();
      expect(result).toEqual([stockItemMock]);
    });
  });

  describe('findOne', () => {
    it('should return a stock item', async () => {
      const result = await service.findOne(stockItemMock.id);
      expect(result).toEqual(stockItemMock);
    });

    it('should throw an error if the stock item does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('stock item not found'));
      await expect(service.findOne(stockItemMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a stock item', async () => {
      const result = await service.update(
        stockItemMock.id,
        updateStockItemMock,
      );
      expect(result).toEqual(stockItemMock);
    });

    it('should throw an error if the stock item does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('stock item not found'));
      await expect(
        service.update(stockItemMock.id, updateStockItemMock),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
