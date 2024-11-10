import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { PurchaseOrderRefund } from '../entities/purchase-order-refund.entity';
import { PurchaseOrderRefundsService } from '../purchase-order-refunds.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { purchaseOrderRefundMock } from './mocks/purchase-order-refund.mock';
import { createPurchaseOrderRefundMock } from './mocks/create-purchase-order-refund.mock';
import { purchaseOrderMock } from '../../tests/mocks/purchase-order.mock';
import { PurchaseOrdersService } from './../../../purchase-orders/purchase-orders.service';
import { NotFoundException } from '@nestjs/common';
import { updatePurchaseOrderRefundMock } from './mocks/update-purchase-order-refund.mock';

describe('PurchaseOrderRefundsService', () => {
  let service: PurchaseOrderRefundsService;
  let repository: Repository<PurchaseOrderRefund>;

  let purchaseOrdersService: PurchaseOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderRefundsService,
        {
          provide: PurchaseOrdersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(purchaseOrderMock),
            calculateTotalValue: jest.fn().mockResolvedValue(100),
          },
        },
        {
          provide: getRepositoryToken(PurchaseOrderRefund),
          useValue: {
            create: jest.fn().mockReturnValue(purchaseOrderRefundMock),
            save: jest.fn().mockResolvedValue(purchaseOrderRefundMock),
            find: jest.fn().mockResolvedValue([purchaseOrderRefundMock]),
            findBy: jest.fn().mockResolvedValue([purchaseOrderRefundMock]),
            findOneOrFail: jest.fn().mockResolvedValue(purchaseOrderRefundMock),
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderRefundsService>(
      PurchaseOrderRefundsService,
    );
    repository = module.get<Repository<PurchaseOrderRefund>>(
      getRepositoryToken(PurchaseOrderRefund),
    );
    purchaseOrdersService = module.get<PurchaseOrdersService>(
      PurchaseOrdersService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(purchaseOrdersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a purchase order refund', async () => {
      const purchaseOrderRefund = await service.create(
        purchaseOrderMock.id,
        createPurchaseOrderRefundMock,
      );
      expect(purchaseOrderRefund).toEqual(purchaseOrderRefundMock);
    });

    it('should throw an error if the purchase order does not exist', async () => {
      jest
        .spyOn(purchaseOrdersService, 'findOne')
        .mockRejectedValueOnce(new Error('Purchase order not found'));
      await expect(
        service.create(purchaseOrderMock.id, createPurchaseOrderRefundMock),
      ).rejects.toThrow('Purchase order not found');
    });
  });

  describe('findAll', () => {
    it('should return an array of purchase order refunds', async () => {
      const purchaseOrderRefunds = await service.findAll(purchaseOrderMock.id);
      expect(purchaseOrderRefunds).toEqual([purchaseOrderRefundMock]);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order refund', async () => {
      const purchaseOrderRefund = await service.findOne(
        purchaseOrderMock.id,
        true,
      );
      expect(purchaseOrderRefund).toEqual(purchaseOrderRefundMock);
    });

    it('should throw an error if the purchase order does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOne(purchaseOrderMock.id, true)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a purchase order refund', async () => {
      const purchaseOrderRefund = await service.update(
        purchaseOrderMock.id,
        updatePurchaseOrderRefundMock,
      );
      expect(purchaseOrderRefund).toEqual(purchaseOrderRefundMock);
    });

    it('should throw an error if the purchase order does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.update(purchaseOrderMock.id, updatePurchaseOrderRefundMock),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
