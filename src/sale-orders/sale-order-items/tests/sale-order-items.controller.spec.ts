import { Test, TestingModule } from '@nestjs/testing';
import { ReturnSaleOrderItemDto } from '../dto/return-sale-order-item.dto';
import { saleOrderItemMock } from './mocks/purchase-sale-item.mock';
import { createSaleOrderItemMock } from './mocks/create-purchase-sale-item.mock';
import { updateSaleOrderItemMock } from './mocks/update-purchase-sale-item.mock';
import { SaleOrderItemsController } from '../sale-order-items.controller';
import { SaleOrderItemsService } from '../sale-order-items.service';

describe('SaleOrderItemsController', () => {
  let controller: SaleOrderItemsController;
  let service: SaleOrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleOrderItemsController],
      providers: [
        {
          provide: SaleOrderItemsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([saleOrderItemMock]),
            create: jest.fn().mockResolvedValue(saleOrderItemMock),
            update: jest.fn().mockResolvedValue(saleOrderItemMock),
            findOne: jest.fn().mockResolvedValue(saleOrderItemMock),
          },
        },
      ],
    }).compile();

    controller = module.get<SaleOrderItemsController>(SaleOrderItemsController);
    service = module.get<SaleOrderItemsService>(SaleOrderItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a sale order item', async () => {
      const saleOrderItem = await controller.create(createSaleOrderItemMock, 1);
      expect(saleOrderItem).toEqual(
        new ReturnSaleOrderItemDto(saleOrderItemMock),
      );
      expect(service.create).toHaveBeenCalledWith(1, createSaleOrderItemMock);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a list of sale order items', async () => {
      const saleOrderItems = await controller.findAll(1);
      expect(saleOrderItems).toEqual([
        new ReturnSaleOrderItemDto(saleOrderItemMock),
      ]);
      expect(service.findAll).toHaveBeenCalledWith(1);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a sale order item', async () => {
      const saleOrderItem = await controller.findOne(1);
      expect(saleOrderItem).toEqual(
        new ReturnSaleOrderItemDto(saleOrderItemMock),
      );
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error if sale order item not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new Error('Sale order item not found'));
      await expect(controller.findOne(1)).rejects.toThrow(
        'Sale order item not found',
      );
    });
  });

  describe('update', () => {
    it('should return a sale order item', async () => {
      const saleOrderItem = await controller.update(1, updateSaleOrderItemMock);
      expect(saleOrderItem).toEqual(
        new ReturnSaleOrderItemDto(saleOrderItemMock),
      );
      expect(service.update).toHaveBeenCalledWith(1, updateSaleOrderItemMock);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should return error if sale order item not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new Error('Sale order item not found'));
      await expect(
        controller.update(1, updateSaleOrderItemMock),
      ).rejects.toThrow('Sale order item not found');
    });
  });
});
