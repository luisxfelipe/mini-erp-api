import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderItemStatusService } from '../purchase-order-item-status.service';
import { PurchaseOrderItemStatus } from '../entities/purchase-order-item-status.entity';
import { purchaseOrderItemStatusMock } from './mocks/purchase-order-item-status.mock';
import { createPurchaseOrderItemStatusMock } from './mocks/create-purchase-order-item-status.mock';
import { updatePurchaseOrderItemStatusMock } from './mocks/update-purchase-order-item-status.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PurchaseOrderItemStatusService', () => {
  let service: PurchaseOrderItemStatusService;
  let repository: Repository<PurchaseOrderItemStatus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderItemStatusService,
        {
          provide: getRepositoryToken(PurchaseOrderItemStatus),
          useValue: {
            create: jest.fn().mockReturnValue(purchaseOrderItemStatusMock),
            save: jest.fn().mockResolvedValue(purchaseOrderItemStatusMock),
            find: jest.fn().mockResolvedValue([purchaseOrderItemStatusMock]),
            findOneOrFail: jest
              .fn()
              .mockResolvedValue(purchaseOrderItemStatusMock),
            findOneByOrFail: jest
              .fn()
              .mockResolvedValue(purchaseOrderItemStatusMock),
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderItemStatusService>(
      PurchaseOrderItemStatusService,
    );
    repository = module.get<Repository<PurchaseOrderItemStatus>>(
      getRepositoryToken(PurchaseOrderItemStatus),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new purchase order item status', async () => {
      jest
        .spyOn(service, 'findOneByName')
        .mockRejectedValueOnce(new NotFoundException());
      const result = await service.create(createPurchaseOrderItemStatusMock);
      expect(result).toEqual(purchaseOrderItemStatusMock);
    });

    it('should throw BadRequestException if purchase order item status already exists', async () => {
      jest
        .spyOn(service, 'findOneByName')
        .mockResolvedValueOnce(purchaseOrderItemStatusMock);
      await expect(
        service.create(createPurchaseOrderItemStatusMock),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of purchase order item statuses', async () => {
      const result = await service.findAll();
      expect(result).toEqual([purchaseOrderItemStatusMock]);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order item status by id', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(purchaseOrderItemStatusMock);
    });

    it('should throw NotFoundException if purchase order item status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByName', () => {
    it('should return a purchase order item status by name', async () => {
      const result = await service.findOneByName(
        purchaseOrderItemStatusMock.name,
      );
      expect(result).toEqual(purchaseOrderItemStatusMock);
    });

    it('should throw NotFoundException if purchase order item status is not found', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOneByName('NonExistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a purchase order item status', async () => {
      const result = await service.update(1, updatePurchaseOrderItemStatusMock);
      expect(result).toEqual(purchaseOrderItemStatusMock);
    });

    it('should throw NotFoundException if purchase order item status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.update(
          purchaseOrderItemStatusMock.id,
          updatePurchaseOrderItemStatusMock,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
