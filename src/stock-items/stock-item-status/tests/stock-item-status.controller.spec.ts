import { Test, TestingModule } from '@nestjs/testing';
import { StockItemStatusController } from '../stock-item-status.controller';
import { StockItemStatusService } from '../stock-item-status.service';
import { stockItemStatusMock } from './mocks/stock-item-status.mock';
import { returnDeleteMock } from './../../../mocks/return-delete.mock';
import { ReturnStockItemStatusDto } from '../dto/return-stock-item-status.dto';
import { createStockItemStatusMock } from './mocks/create-stock-item-status.mock';
import { updateStockItemStatusMock } from './mocks/update-stock-item-status.mock';

describe('StockItemStatusController', () => {
  let controller: StockItemStatusController;
  let service: StockItemStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockItemStatusController],
      providers: [
        {
          provide: StockItemStatusService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([stockItemStatusMock]),
            create: jest.fn().mockResolvedValue(stockItemStatusMock),
            update: jest.fn().mockResolvedValue(stockItemStatusMock),
            findOne: jest.fn().mockResolvedValue(stockItemStatusMock),
            remove: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    controller = module.get<StockItemStatusController>(
      StockItemStatusController,
    );
    service = module.get<StockItemStatusService>(StockItemStatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a stock item status', async () => {
      const result = await controller.create(createStockItemStatusMock);
      expect(result).toEqual(new ReturnStockItemStatusDto(stockItemStatusMock));
    });
  });

  describe('findAll', () => {
    it('should return an array of stock item status', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        new ReturnStockItemStatusDto(stockItemStatusMock),
      ]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a stock item status', async () => {
      const result = await controller.findOne(stockItemStatusMock.id);
      expect(result).toEqual(new ReturnStockItemStatusDto(stockItemStatusMock));
      expect(service.findOne).toHaveBeenCalledWith(stockItemStatusMock.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error if stock item status is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      await expect(
        controller.findOne(stockItemStatusMock.id),
      ).rejects.toThrow();
      expect(service.findOne).toHaveBeenCalledWith(stockItemStatusMock.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a stock item status', async () => {
      const result = await controller.update(
        stockItemStatusMock.id,
        updateStockItemStatusMock,
      );
      expect(result).toEqual(new ReturnStockItemStatusDto(stockItemStatusMock));
      expect(service.update).toHaveBeenCalledWith(
        stockItemStatusMock.id,
        updateStockItemStatusMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should return error if stock item status is not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      await expect(
        controller.update(stockItemStatusMock.id, updateStockItemStatusMock),
      ).rejects.toThrow();
      expect(service.update).toHaveBeenCalledWith(
        stockItemStatusMock.id,
        updateStockItemStatusMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete a sale status', async () => {
      const saleStatus = await service.remove(stockItemStatusMock.id);

      expect(saleStatus).toEqual(returnDeleteMock);
    });

    it('should return error if stock item status is not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new Error('Stock Item Status not found'));
      await expect(service.remove(stockItemStatusMock.id)).rejects.toThrow();
      expect(service.remove).toHaveBeenCalledWith(stockItemStatusMock.id);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
