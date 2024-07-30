import { Test, TestingModule } from '@nestjs/testing';
import { StockItemIdentifiersController } from '../stock-item-identifiers.controller';
import { StockItemIdentifiersService } from '../stock-item-identifiers.service';
import { createStockItemIdentifierMock } from './mocks/create-stock-item-identifier.mock';
import { updateStockItemIdentifierMock } from './mocks/update-stock-item-identifier.mock';
import { ReturnStockItemIdentifierDto } from '../dto/return-stock-item-identifier.dto';
import { stockItemIdentifierMock } from './mocks/stock-item-identifier.mock';

describe('StockItemIdentifiersController', () => {
  let controller: StockItemIdentifiersController;
  let service: StockItemIdentifiersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockItemIdentifiersController],
      providers: [
        {
          provide: StockItemIdentifiersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([stockItemIdentifierMock]),
            create: jest.fn().mockResolvedValue(stockItemIdentifierMock),
            update: jest.fn().mockResolvedValue(stockItemIdentifierMock),
            findOne: jest.fn().mockResolvedValue(stockItemIdentifierMock),
            delete: jest.fn().mockResolvedValue(stockItemIdentifierMock),
          },
        },
      ],
    }).compile();

    controller = module.get<StockItemIdentifiersController>(
      StockItemIdentifiersController,
    );
    service = module.get<StockItemIdentifiersService>(
      StockItemIdentifiersService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a stock item identifier', async () => {
      const result = await controller.create(createStockItemIdentifierMock);
      expect(result).toEqual(
        new ReturnStockItemIdentifierDto(stockItemIdentifierMock),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of stock item identifiers', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        new ReturnStockItemIdentifierDto(stockItemIdentifierMock),
      ]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a stock item identifier', async () => {
      const result = await controller.findOne(stockItemIdentifierMock.id);
      expect(result).toEqual(
        new ReturnStockItemIdentifierDto(stockItemIdentifierMock),
      );
    });
  });

  describe('update', () => {
    it('should update a stock item identifier', async () => {
      const result = await controller.update(
        stockItemIdentifierMock.id,
        updateStockItemIdentifierMock,
      );
      expect(result).toEqual(
        new ReturnStockItemIdentifierDto(stockItemIdentifierMock),
      );
    });
  });
});
