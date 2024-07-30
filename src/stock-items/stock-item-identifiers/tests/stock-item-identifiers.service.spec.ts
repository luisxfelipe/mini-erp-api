import { Test, TestingModule } from '@nestjs/testing';
import { StockItemIdentifiersService } from '../stock-item-identifiers.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StockItemIdentifier } from '../entities/stock-item-identifier.entity';
import { createStockItemIdentifierMock } from './mocks/create-stock-item-identifier.mock';
import { updateStockItemIdentifierMock } from './mocks/update-stock-item-identifier.mock';
import { stockItemIdentifierMock } from './mocks/stock-item-identifier.mock';
import { StockItemIdentifierTypesService } from './../../../stock-items/stock-item-identifier-types/stock-item-identifier-types.service';
import { stockItemIdentifierTypeMock } from './../../../stock-items/stock-item-identifier-types/tests/mocks/stock-item-identifier-type.mock';
import { NotFoundException } from '@nestjs/common';

describe('StockItemIdentifiersService', () => {
  let service: StockItemIdentifiersService;
  let repository: Repository<StockItemIdentifier>;

  let stockItemIdentifierTypesService: StockItemIdentifierTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockItemIdentifiersService,
        {
          provide: getRepositoryToken(StockItemIdentifier),
          useValue: {
            find: jest.fn().mockResolvedValue([stockItemIdentifierMock]),
            findOneOrFail: jest.fn().mockResolvedValue(stockItemIdentifierMock),
            create: jest.fn().mockResolvedValue(stockItemIdentifierMock),
            save: jest.fn().mockResolvedValue(stockItemIdentifierMock),
          },
        },
        {
          provide: StockItemIdentifierTypesService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(stockItemIdentifierMock),
          },
        },
      ],
    }).compile();

    service = module.get<StockItemIdentifiersService>(
      StockItemIdentifiersService,
    );
    repository = module.get<Repository<StockItemIdentifier>>(
      getRepositoryToken(StockItemIdentifier),
    );

    stockItemIdentifierTypesService =
      module.get<StockItemIdentifierTypesService>(
        StockItemIdentifierTypesService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(stockItemIdentifierTypesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a stock item identifier', async () => {
      jest
        .spyOn(stockItemIdentifierTypesService, 'findOne')
        .mockResolvedValueOnce(stockItemIdentifierTypeMock);
      const result = await service.create(createStockItemIdentifierMock);
      expect(result).toEqual(stockItemIdentifierMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(stockItemIdentifierTypesService, 'findOne')
        .mockRejectedValueOnce(new Error());
      expect(service.create(createStockItemIdentifierMock)).rejects.toThrow(
        Error,
      );
    });
  });

  describe('findAll', () => {
    it('should return stock item identifiers', async () => {
      const result = await service.findAll();
      expect(result).toEqual([stockItemIdentifierMock]);
    });
  });

  describe('findOne', () => {
    it('should return a stock item identifier', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(stockItemIdentifierMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a stock item identifier', async () => {
      const result = await service.update(1, updateStockItemIdentifierMock);
      expect(result).toEqual(stockItemIdentifierMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      expect(service.update(1, updateStockItemIdentifierMock)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
