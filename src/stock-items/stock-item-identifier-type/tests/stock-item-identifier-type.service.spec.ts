import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { StockItemIdentifierType } from '../entities/stock-item-identifier-type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { stockItemIdentifierTypeMock } from './mocks/stock-item-identifier-type.mock';
import { returnDeleteMock } from './../../../mocks/return-delete.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { StockItemIdentifierTypeService } from '../stock-item-identifier-type.service';
import { createStockItemIdentifierTypeMock } from './mocks/create-stock-item-identifier-type.mock';
import { updateStockItemIdentifierTypeMock } from './mocks/update-stock-item-identifier-type.mock';

describe('StockItemIdentifierTypeService', () => {
  let service: StockItemIdentifierTypeService;
  let repository: Repository<StockItemIdentifierType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockItemIdentifierTypeService,
        {
          provide: getRepositoryToken(StockItemIdentifierType),
          useValue: {
            find: jest.fn().mockResolvedValue([stockItemIdentifierTypeMock]),
            findOneOrFail: jest
              .fn()
              .mockResolvedValue(stockItemIdentifierTypeMock),
            findOneByOrFail: jest
              .fn()
              .mockResolvedValue(stockItemIdentifierTypeMock),
            create: jest.fn().mockReturnValue(stockItemIdentifierTypeMock),
            save: jest.fn().mockResolvedValue(stockItemIdentifierTypeMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<StockItemIdentifierTypeService>(
      StockItemIdentifierTypeService,
    );
    repository = module.get<Repository<StockItemIdentifierType>>(
      getRepositoryToken(StockItemIdentifierType),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a stock item identifier type', async () => {
      jest.spyOn(service, 'findOneByName').mockResolvedValueOnce(undefined);

      const result = await service.create(createStockItemIdentifierTypeMock);

      expect(result).toEqual(stockItemIdentifierTypeMock);
      expect(repository.save).toHaveBeenCalledWith(stockItemIdentifierTypeMock);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(service.findOneByName).toHaveBeenCalledTimes(1);
    });

    it('should return an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.create(createStockItemIdentifierTypeMock)).rejects.toThrow(
        Error,
      );
    });

    it('should throw BadRequestException if stock item identifier type already exists', async () => {
      jest
        .spyOn(service, 'findOneByName')
        .mockResolvedValueOnce(stockItemIdentifierTypeMock);
      await expect(
        service.create(createStockItemIdentifierTypeMock),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of stock item identifier type', async () => {
      const result = await service.findAll();

      expect(result).toEqual([stockItemIdentifierTypeMock]);
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a stock item identifier type', async () => {
      const result = await service.findOne(stockItemIdentifierTypeMock.id);

      expect(result).toEqual(stockItemIdentifierTypeMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findOne(stockItemIdentifierTypeMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findOneByName', () => {
    it('should return a stock item status', async () => {
      const result = await service.findOneByName(
        stockItemIdentifierTypeMock.name,
      );
      expect(result).toEqual(stockItemIdentifierTypeMock);
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
    it('should update a stock item identifier type', async () => {
      const result = await service.update(
        stockItemIdentifierTypeMock.id,
        updateStockItemIdentifierTypeMock,
      );

      expect(result).toEqual(stockItemIdentifierTypeMock);
    });

    it('should throw NotFoundException if stock item identifier type is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.update(
          stockItemIdentifierTypeMock.id,
          updateStockItemIdentifierTypeMock,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a stock item identifier type', async () => {
      const result = await service.remove(stockItemIdentifierTypeMock.id);
      expect(result).toEqual(returnDeleteMock);
    });

    it('should throw NotFoundException if stock item identifier type is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.remove(stockItemIdentifierTypeMock.id),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
