import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderItemsController } from '../purchase-order-items.controller';
import { PurchaseOrderItemsService } from '../purchase-order-items.service';
import { ReturnPurchaseOrderItemDto } from '../dto/return-purchase-order-item.dto';
import { purchaseOrderItemMock } from './mocks/purchase-order-item.mock';
import { createPurchaseOrderItemMock } from './mocks/create-purchase-order-item.mock';
import { updatePurchaseOrderItemMock } from './mocks/update-purchase-order-item.mock';

describe('PurchaseOrderItemsController', () => {
  let controller: PurchaseOrderItemsController;
  let service: PurchaseOrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderItemsController],
      providers: [
        {
          provide: PurchaseOrderItemsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([purchaseOrderItemMock]),
            create: jest.fn().mockResolvedValue(purchaseOrderItemMock),
            update: jest.fn().mockResolvedValue(purchaseOrderItemMock),
            findOne: jest.fn().mockResolvedValue(purchaseOrderItemMock),
          },
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderItemsController>(
      PurchaseOrderItemsController,
    );
    service = module.get<PurchaseOrderItemsService>(PurchaseOrderItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a purchase order item', async () => {
      const purchaseOrderItem = await controller.create(
        createPurchaseOrderItemMock,
        1,
      );
      expect(purchaseOrderItem).toEqual(
        new ReturnPurchaseOrderItemDto(purchaseOrderItemMock),
      );
      expect(service.create).toHaveBeenCalledWith(
        1,
        createPurchaseOrderItemMock,
      );
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a list of purchase order items', async () => {
      const purchaseOrderItems = await controller.findAll(1);
      expect(purchaseOrderItems).toEqual([
        new ReturnPurchaseOrderItemDto(purchaseOrderItemMock),
      ]);
      expect(service.findAll).toHaveBeenCalledWith(1);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order item', async () => {
      const purchaseOrderItem = await controller.findOne(1);
      expect(purchaseOrderItem).toEqual(
        new ReturnPurchaseOrderItemDto(purchaseOrderItemMock),
      );
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error if purchase order item not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new Error('Purchase order item not found'));
      await expect(controller.findOne(1)).rejects.toThrow(
        'Purchase order item not found',
      );
    });
  });

  describe('update', () => {
    it('should return a purchase order item', async () => {
      const purchaseOrderItem = await controller.update(
        1,
        updatePurchaseOrderItemMock,
      );
      expect(purchaseOrderItem).toEqual(
        new ReturnPurchaseOrderItemDto(purchaseOrderItemMock),
      );
      expect(service.update).toHaveBeenCalledWith(
        1,
        updatePurchaseOrderItemMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should return error if purchase order item not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new Error('Purchase order item not found'));
      await expect(
        controller.update(1, updatePurchaseOrderItemMock),
      ).rejects.toThrow('Purchase order item not found');
    });
  });
});
