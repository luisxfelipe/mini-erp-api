import { Test, TestingModule } from '@nestjs/testing';
import { createStockItemMock } from './mocks/create-stock-item.mock';
import { updateStockItemMock } from './mocks/update-stock-item.mock';
import { stockItemMock } from './mocks/stock-item.mock';
import { ReturnStockItemDto } from '../dto/return-stock-item.dto';
import { StockItemsController } from '../stock-items.controller';
import { StockItemsService } from '../stock-items.service';

describe('StockItemsController', () => {
  let controller: StockItemsController;
  let service: StockItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockItemsController],
      providers: [
        {
          provide: StockItemsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([stockItemMock]),
            create: jest.fn().mockResolvedValue(stockItemMock),
            update: jest.fn().mockResolvedValue(stockItemMock),
            findOne: jest.fn().mockResolvedValue(stockItemMock),
          },
        },
      ],
    }).compile();

    controller = module.get<StockItemsController>(StockItemsController);
    service = module.get<StockItemsService>(StockItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a stock item', async () => {
      const stockItem = await controller.create(createStockItemMock);
      expect(stockItem).toEqual(new ReturnStockItemDto(stockItemMock));
      expect(service.create).toHaveBeenCalledWith(createStockItemMock);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a list of stock items', async () => {
      const stockItems = await controller.findAll();
      expect(stockItems).toEqual([new ReturnStockItemDto(stockItemMock)]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a stock item', async () => {
      const stockItem = await controller.findOne(1);
      expect(stockItem).toEqual(new ReturnStockItemDto(stockItemMock));
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a stock item', async () => {
      const stockItem = await controller.update(1, updateStockItemMock);
      expect(stockItem).toEqual(new ReturnStockItemDto(stockItemMock));
      expect(service.update).toHaveBeenCalledWith(1, updateStockItemMock);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });
});
