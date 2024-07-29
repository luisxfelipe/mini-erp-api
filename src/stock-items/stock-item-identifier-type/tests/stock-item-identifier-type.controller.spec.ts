import { Test, TestingModule } from '@nestjs/testing';
import { stockItemIdentifierTypeMock } from './mocks/stock-item-identifier-type.mock';
import { returnDeleteMock } from './../../../mocks/return-delete.mock';
import { ReturnStockItemIdentifierTypeDto } from '../dto/return-stock-item-identifier-type';
import { StockItemIdentifierTypeController } from '../stock-item-identifier-type.controller';
import { StockItemIdentifierTypeService } from '../stock-item-identifier-type.service';
import { updateStockItemIdentifierTypeMock } from './mocks/update-stock-item-identifier-type.mock';

describe('StockItemIdentifierTypeController', () => {
  let controller: StockItemIdentifierTypeController;
  let service: StockItemIdentifierTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockItemIdentifierTypeController],
      providers: [
        {
          provide: StockItemIdentifierTypeService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([stockItemIdentifierTypeMock]),
            create: jest.fn().mockResolvedValue(stockItemIdentifierTypeMock),
            update: jest.fn().mockResolvedValue(stockItemIdentifierTypeMock),
            findOne: jest.fn().mockResolvedValue(stockItemIdentifierTypeMock),
            remove: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    controller = module.get<StockItemIdentifierTypeController>(
      StockItemIdentifierTypeController,
    );
    service = module.get<StockItemIdentifierTypeService>(
      StockItemIdentifierTypeService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a stock item identifier type', async () => {
      const result = await controller.create(stockItemIdentifierTypeMock);
      expect(result).toEqual(
        new ReturnStockItemIdentifierTypeDto(stockItemIdentifierTypeMock),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of stock item identifier type', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        new ReturnStockItemIdentifierTypeDto(stockItemIdentifierTypeMock),
      ]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a stock item identifier type', async () => {
      const result = await controller.findOne(stockItemIdentifierTypeMock.id);
      expect(result).toEqual(
        new ReturnStockItemIdentifierTypeDto(stockItemIdentifierTypeMock),
      );
      expect(service.findOne).toHaveBeenCalledWith(
        stockItemIdentifierTypeMock.id,
      );
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error if stock item identifier type is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      await expect(
        controller.findOne(stockItemIdentifierTypeMock.id),
      ).rejects.toThrow();
      expect(service.findOne).toHaveBeenCalledWith(
        stockItemIdentifierTypeMock.id,
      );
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a stock item identifier type', async () => {
      const result = await controller.update(
        stockItemIdentifierTypeMock.id,
        updateStockItemIdentifierTypeMock,
      );
      expect(result).toEqual(
        new ReturnStockItemIdentifierTypeDto(stockItemIdentifierTypeMock),
      );
      expect(service.update).toHaveBeenCalledWith(
        stockItemIdentifierTypeMock.id,
        updateStockItemIdentifierTypeMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should return error if stock item identifier type is not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      await expect(
        controller.update(
          stockItemIdentifierTypeMock.id,
          updateStockItemIdentifierTypeMock,
        ),
      ).rejects.toThrow();
      expect(service.update).toHaveBeenCalledWith(
        stockItemIdentifierTypeMock.id,
        updateStockItemIdentifierTypeMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete a sale identifier type', async () => {
      const saleStatus = await service.remove(stockItemIdentifierTypeMock.id);

      expect(saleStatus).toEqual(returnDeleteMock);
    });

    it('should return error if stock item identifier type is not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new Error('Stock Item Status not found'));
      await expect(
        service.remove(stockItemIdentifierTypeMock.id),
      ).rejects.toThrow();
      expect(service.remove).toHaveBeenCalledWith(
        stockItemIdentifierTypeMock.id,
      );
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
