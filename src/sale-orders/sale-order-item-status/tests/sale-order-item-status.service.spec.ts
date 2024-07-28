import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderItemStatusService } from '../sale-order-item-status.service';
import { SaleOrderItemStatus } from '../entities/sale-order-item-status.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { saleOrderItemStatusMock } from './mocks/sale-order-item-status.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { createSaleOrderItemStatusMock } from './mocks/create-sale-order-item-status.mock';
import { updateSaleOrderItemStatusMock } from './mocks/update-sale-order-item-status.mock';

describe('SaleOrderItemStatusService', () => {
  let service: SaleOrderItemStatusService;
  let repository: Repository<SaleOrderItemStatus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleOrderItemStatusService,
        {
          provide: getRepositoryToken(SaleOrderItemStatus),
          useValue: {
            create: jest.fn().mockReturnValue(saleOrderItemStatusMock),
            save: jest.fn().mockResolvedValue(saleOrderItemStatusMock),
            find: jest.fn().mockResolvedValue([saleOrderItemStatusMock]),
            findOneOrFail: jest.fn().mockResolvedValue(saleOrderItemStatusMock),
            findOneByOrFail: jest
              .fn()
              .mockResolvedValue(saleOrderItemStatusMock),
          },
        },
      ],
    }).compile();

    service = module.get<SaleOrderItemStatusService>(
      SaleOrderItemStatusService,
    );
    repository = module.get<Repository<SaleOrderItemStatus>>(
      getRepositoryToken(SaleOrderItemStatus),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new sale order item status', async () => {
      jest
        .spyOn(service, 'findOneByName')
        .mockRejectedValueOnce(new NotFoundException());
      const result = await service.create(createSaleOrderItemStatusMock);
      expect(result).toEqual(saleOrderItemStatusMock);
    });

    it('should throw BadRequestException if sale order item status already exists', async () => {
      jest
        .spyOn(service, 'findOneByName')
        .mockResolvedValueOnce(saleOrderItemStatusMock);
      await expect(
        service.create(createSaleOrderItemStatusMock),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of sale order item statuses', async () => {
      const result = await service.findAll();
      expect(result).toEqual([saleOrderItemStatusMock]);
    });
  });

  describe('findOne', () => {
    it('should return a sale order item status by id', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(saleOrderItemStatusMock);
    });

    it('should throw NotFoundException if sale order item status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByName', () => {
    it('should return a sale order item status by name', async () => {
      const result = await service.findOneByName(saleOrderItemStatusMock.name);
      expect(result).toEqual(saleOrderItemStatusMock);
    });

    it('should throw NotFoundException if sale order item status is not found', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOneByName('NonExistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a sale order item status', async () => {
      const result = await service.update(1, updateSaleOrderItemStatusMock);
      expect(result).toEqual(saleOrderItemStatusMock);
    });

    it('should throw NotFoundException if sale order item status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.update(
          saleOrderItemStatusMock.id,
          updateSaleOrderItemStatusMock,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
