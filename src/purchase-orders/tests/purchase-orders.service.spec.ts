import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { purchaseOrderMock } from './mocks/purchase-order.mock';
import { createPurchaseOrderMock } from './mocks/create-purchase-order.mock';
import { updatePurchaseOrderMock } from './mocks/update-purchase-order.mock';
import { PurchaseOrderItemsService } from '../purchase-order-items/purchase-order-items.service';
import { PurchaseOrderStatusService } from '../purchase-order-status/purchase-order-status.service';
import { purchaseOrderStatusMock } from '../purchase-order-status/tests/mocks/purchase-order-status.mock';
import { supplierMock } from './../../suppliers/tests/mocks/supplier.mock';
import { SuppliersService } from './../../suppliers/suppliers.service';
import { NotFoundException } from '@nestjs/common';

describe('PurchaseOrdersService', () => {
  let service: PurchaseOrdersService;
  let repository: Repository<PurchaseOrder>;

  let purchaseOrderItemsService: PurchaseOrderItemsService;
  let purchaseOrderStatusService: PurchaseOrderStatusService;
  let suppliersService: SuppliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrdersService,
        {
          provide: PurchaseOrderItemsService,
          useValue: {
            calculateTotalValue: jest.fn().mockResolvedValue(100),
          },
        },
        {
          provide: PurchaseOrderStatusService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(purchaseOrderStatusMock),
          },
        },
        {
          provide: SuppliersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(supplierMock),
          },
        },
        {
          provide: getRepositoryToken(PurchaseOrder),
          useValue: {
            find: jest.fn().mockResolvedValue([purchaseOrderMock]),
            findBy: jest.fn().mockResolvedValue([purchaseOrderMock]),
            findOneOrFail: jest.fn().mockResolvedValue(purchaseOrderMock),
            create: jest.fn().mockReturnValue(purchaseOrderMock),
            save: jest.fn().mockResolvedValue(purchaseOrderMock),
            update: jest.fn().mockResolvedValue(purchaseOrderMock),
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseOrdersService>(PurchaseOrdersService);
    repository = module.get<Repository<PurchaseOrder>>(
      getRepositoryToken(PurchaseOrder),
    );

    purchaseOrderItemsService = module.get<PurchaseOrderItemsService>(
      PurchaseOrderItemsService,
    );
    purchaseOrderStatusService = module.get<PurchaseOrderStatusService>(
      PurchaseOrderStatusService,
    );
    suppliersService = module.get<SuppliersService>(SuppliersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(purchaseOrderItemsService).toBeDefined();
    expect(purchaseOrderStatusService).toBeDefined();
    expect(suppliersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a purchase order', async () => {
      jest.spyOn(suppliersService, 'findOne').mockResolvedValue(supplierMock);
      jest
        .spyOn(purchaseOrderStatusService, 'findOne')
        .mockResolvedValue(purchaseOrderStatusMock);
      const result = await service.create(createPurchaseOrderMock);
      expect(result).toEqual(purchaseOrderMock);

      expect(repository.create).toHaveBeenCalledWith(createPurchaseOrderMock);
      expect(repository.save).toHaveBeenCalledWith(purchaseOrderMock);
      expect(purchaseOrderStatusService.findOne).toHaveBeenCalledWith(
        createPurchaseOrderMock.purchaseOrderStatusId,
      );
      expect(suppliersService.findOne).toHaveBeenCalledWith(
        createPurchaseOrderMock.supplierId,
      );
    });

    it('should throw an error if supplier not found', async () => {
      jest
        .spyOn(suppliersService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      jest
        .spyOn(purchaseOrderStatusService, 'findOne')
        .mockResolvedValue(purchaseOrderStatusMock);

      await expect(service.create(createPurchaseOrderMock)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if purchase order status not found', async () => {
      jest.spyOn(suppliersService, 'findOne').mockResolvedValue(supplierMock);

      jest
        .spyOn(purchaseOrderStatusService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(service.create(createPurchaseOrderMock)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of purchase orders', async () => {
      const result = await service.findAll();
      expect(result).toEqual([purchaseOrderMock]);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order', async () => {
      const result = await service.findOne(purchaseOrderMock.id);
      expect(result).toEqual(purchaseOrderMock);
    });

    it('should throw an error if purchase order not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      expect(service.findOne(purchaseOrderMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a purchase order', async () => {
      const result = await service.update(
        purchaseOrderMock.id,
        updatePurchaseOrderMock,
      );
      expect(result).toEqual(purchaseOrderMock);
    });

    it('should throw an error if purchase order not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      expect(
        service.update(purchaseOrderMock.id, updatePurchaseOrderMock),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
