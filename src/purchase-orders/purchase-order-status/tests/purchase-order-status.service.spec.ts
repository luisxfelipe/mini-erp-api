import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { PurchaseOrderStatus } from '../entities/purchase-order-status.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { purchaseOrderStatusMock } from './mocks/purchase-order-status.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { createPurchaseOrderStatusDtoMock } from './mocks/create-purchase-order-status.mock';
import { updatePurchaseOrderStatusDtoMock } from './mocks/update-purchase-order-status.mock';
import { PurchaseOrderStatusService } from '../purchase-order-status.service';

describe('PurchaseOrderStatusService', () => {
  let service: PurchaseOrderStatusService;
  let repository: Repository<PurchaseOrderStatus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderStatusService,
        {
          provide: getRepositoryToken(PurchaseOrderStatus),
          useValue: {
            create: jest.fn().mockReturnValue(purchaseOrderStatusMock),
            save: jest.fn().mockResolvedValue(purchaseOrderStatusMock),
            find: jest.fn().mockResolvedValue([purchaseOrderStatusMock]),
            findOneOrFail: jest.fn().mockResolvedValue(purchaseOrderStatusMock),
            findOneByOrFail: jest
              .fn()
              .mockResolvedValue(purchaseOrderStatusMock),
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderStatusService>(
      PurchaseOrderStatusService,
    );
    repository = module.get<Repository<PurchaseOrderStatus>>(
      getRepositoryToken(PurchaseOrderStatus),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new purchase order status', async () => {
      jest
        .spyOn(service, 'findOneByName')
        .mockRejectedValueOnce(new NotFoundException());
      const result = await service.create(createPurchaseOrderStatusDtoMock);
      expect(result).toEqual(purchaseOrderStatusMock);
    });

    it('should throw BadRequestException if purchase order status already exists', async () => {
      jest
        .spyOn(service, 'findOneByName')
        .mockResolvedValueOnce(purchaseOrderStatusMock);
      await expect(
        service.create(createPurchaseOrderStatusDtoMock),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of purchase order statuses', async () => {
      const result = await service.findAll();
      expect(result).toEqual([purchaseOrderStatusMock]);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order status by id', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(purchaseOrderStatusMock);
    });

    it('should throw NotFoundException if purchase order status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByName', () => {
    it('should return a purchase order status by name', async () => {
      const result = await service.findOneByName('Pending');
      expect(result).toEqual(purchaseOrderStatusMock);
    });

    it('should throw NotFoundException if purchase order status is not found', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOneByName('NonExistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a purchase order status', async () => {
      const result = await service.update(1, updatePurchaseOrderStatusDtoMock);
      expect(result).toEqual(purchaseOrderStatusMock);
    });

    it('should throw NotFoundException if purchase order status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.update(
          purchaseOrderStatusMock.id,
          updatePurchaseOrderStatusDtoMock,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
