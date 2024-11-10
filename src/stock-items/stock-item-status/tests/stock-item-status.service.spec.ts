import { Test, TestingModule } from '@nestjs/testing';
import { StockItemStatusService } from '../stock-item-status.service';
import { StockItemStatus } from '../entities/stock-item-status.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { stockItemStatusMock } from './mocks/stock-item-status.mock';
import { returnDeleteMock } from './../../../mocks/return-delete.mock';
import { createStockItemStatusMock } from './mocks/create-stock-item-status.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { updateStockItemStatusMock } from './mocks/update-stock-item-status.mock';

describe('StockItemStatusService', () => {
  let service: StockItemStatusService;
  let repository: Repository<StockItemStatus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockItemStatusService,
        {
          provide: getRepositoryToken(StockItemStatus),
          useValue: {
            find: jest.fn().mockResolvedValue([stockItemStatusMock]),
            findOneOrFail: jest.fn().mockResolvedValue(stockItemStatusMock),
            findOneByOrFail: jest.fn().mockResolvedValue(stockItemStatusMock),
            create: jest.fn().mockReturnValue(stockItemStatusMock),
            save: jest.fn().mockResolvedValue(stockItemStatusMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<StockItemStatusService>(StockItemStatusService);
    repository = module.get<Repository<StockItemStatus>>(
      getRepositoryToken(StockItemStatus),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a stock item status', async () => {
      jest.spyOn(service, 'findOneByName').mockResolvedValueOnce(undefined);

      const result = await service.create(createStockItemStatusMock);

      expect(result).toEqual(stockItemStatusMock);
      expect(repository.save).toHaveBeenCalledWith(stockItemStatusMock);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(service.findOneByName).toHaveBeenCalledTimes(1);
    });

    it('should return an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.create(createStockItemStatusMock)).rejects.toThrow(Error);
    });

    it('should throw BadRequestException if stock item status already exists', async () => {
      jest
        .spyOn(service, 'findOneByName')
        .mockResolvedValueOnce(stockItemStatusMock);
      await expect(service.create(createStockItemStatusMock)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of stock item status', async () => {
      const result = await service.findAll();

      expect(result).toEqual([stockItemStatusMock]);
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a stock item status', async () => {
      const result = await service.findOne(stockItemStatusMock.id);

      expect(result).toEqual(stockItemStatusMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findOne(stockItemStatusMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findOneByName', () => {
    it('should return a stock item status', async () => {
      const result = await service.findOneByName(stockItemStatusMock.name);
      expect(result).toEqual(stockItemStatusMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOneByName('NonExistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a stock item status', async () => {
      const result = await service.update(
        stockItemStatusMock.id,
        updateStockItemStatusMock,
      );

      expect(result).toEqual(stockItemStatusMock);
    });

    it('should throw NotFoundException if stock item status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.update(stockItemStatusMock.id, updateStockItemStatusMock),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a stock item status', async () => {
      const result = await service.remove(stockItemStatusMock.id);
      expect(result).toEqual(returnDeleteMock);
    });

    it('should throw NotFoundException if stock item status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.remove(stockItemStatusMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
