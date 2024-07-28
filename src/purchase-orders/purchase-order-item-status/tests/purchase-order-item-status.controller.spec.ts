import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderItemStatusController } from '../purchase-order-item-status.controller';
import { PurchaseOrderItemStatusService } from '../purchase-order-item-status.service';
import { purchaseOrderItemStatusMock } from './mocks/purchase-order-item-status.mock';
import { ReturnPurchaseOrderItemStatusDto } from '../dto/return-purchase-order-item-status';
import { createPurchaseOrderItemStatusMock } from './mocks/create-purchase-order-item-status.mock';
import { updatePurchaseOrderItemStatusMock } from './mocks/update-purchase-order-item-status.mock';

describe('PurchaseOrderItemStatusController', () => {
  let controller: PurchaseOrderItemStatusController;
  let service: PurchaseOrderItemStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderItemStatusController],
      providers: [
        {
          provide: PurchaseOrderItemStatusService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([purchaseOrderItemStatusMock]),
            create: jest.fn().mockResolvedValue(purchaseOrderItemStatusMock),
            update: jest.fn().mockResolvedValue(purchaseOrderItemStatusMock),
            findOne: jest.fn().mockResolvedValue(purchaseOrderItemStatusMock),
          },
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderItemStatusController>(
      PurchaseOrderItemStatusController,
    );
    service = module.get<PurchaseOrderItemStatusService>(
      PurchaseOrderItemStatusService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a purchase order item status', async () => {
      const result = await controller.create(createPurchaseOrderItemStatusMock);
      expect(result).toEqual(
        new ReturnPurchaseOrderItemStatusDto(purchaseOrderItemStatusMock),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of purchase order item status', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        new ReturnPurchaseOrderItemStatusDto(purchaseOrderItemStatusMock),
      ]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order item status', async () => {
      const result = await controller.findOne(purchaseOrderItemStatusMock.id);
      expect(result).toEqual(
        new ReturnPurchaseOrderItemStatusDto(purchaseOrderItemStatusMock),
      );
      expect(service.findOne).toHaveBeenCalledWith(
        purchaseOrderItemStatusMock.id,
      );
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error if purchase order item status is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(
          new Error('Purchase order item status not found'),
        );
      await expect(
        controller.findOne(purchaseOrderItemStatusMock.id),
      ).rejects.toThrow('Purchase order item status not found');
      expect(service.findOne).toHaveBeenCalledWith(
        purchaseOrderItemStatusMock.id,
      );
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a purchase order item status', async () => {
      const result = await controller.update(
        purchaseOrderItemStatusMock.id,
        updatePurchaseOrderItemStatusMock,
      );
      expect(result).toEqual(
        new ReturnPurchaseOrderItemStatusDto(purchaseOrderItemStatusMock),
      );
    });

    it('should return error if purchase order item status is not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(
          new Error('Purchase order item status not found'),
        );
      await expect(
        controller.update(
          purchaseOrderItemStatusMock.id,
          purchaseOrderItemStatusMock,
        ),
      ).rejects.toThrow('Purchase order item status not found');
      expect(service.update).toHaveBeenCalledWith(
        purchaseOrderItemStatusMock.id,
        purchaseOrderItemStatusMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });
});
