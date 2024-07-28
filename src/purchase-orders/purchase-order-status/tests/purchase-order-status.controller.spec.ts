import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderStatusController } from '../purchase-order-status.controller';
import { PurchaseOrderStatusService } from '../purchase-order-status.service';
import { ReturnPurchaseOrderStatusDto } from '../dto/return-purchase-order-status.dto';
import { purchaseOrderStatusMock } from './mocks/purchase-order-status.mock';
import { createPurchaseOrderStatusDtoMock } from './mocks/create-purchase-order-status.mock';
import { updatePurchaseOrderStatusDtoMock } from './mocks/update-purchase-order-status.mock';

describe('PurchaseOrderStatusController', () => {
  let controller: PurchaseOrderStatusController;
  let service: PurchaseOrderStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderStatusController],
      providers: [
        {
          provide: PurchaseOrderStatusService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([purchaseOrderStatusMock]),
            create: jest.fn().mockResolvedValue(purchaseOrderStatusMock),
            update: jest.fn().mockResolvedValue(purchaseOrderStatusMock),
            findOne: jest.fn().mockResolvedValue(purchaseOrderStatusMock),
          },
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderStatusController>(
      PurchaseOrderStatusController,
    );
    service = module.get<PurchaseOrderStatusService>(
      PurchaseOrderStatusService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a purchase order status', async () => {
      const purchaseOrderStatus = await controller.create(
        createPurchaseOrderStatusDtoMock,
      );
      expect(purchaseOrderStatus).toEqual(
        new ReturnPurchaseOrderStatusDto(purchaseOrderStatusMock),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of purchase order status', async () => {
      const purchaseOrderStatus = await controller.findAll();
      expect(purchaseOrderStatus).toEqual([
        new ReturnPurchaseOrderStatusDto(purchaseOrderStatusMock),
      ]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order status', async () => {
      const purchaseOrderStatus = await controller.findOne(
        purchaseOrderStatusMock.id,
      );
      expect(purchaseOrderStatus).toEqual(
        new ReturnPurchaseOrderStatusDto(purchaseOrderStatusMock),
      );
      expect(service.findOne).toHaveBeenCalledWith(
        purchaseOrderStatusMock.id,
        true,
      );
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error if purchase order status is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new Error('Purchase order status not found'));
      await expect(
        controller.findOne(purchaseOrderStatusMock.id),
      ).rejects.toThrow('Purchase order status not found');
      expect(service.findOne).toHaveBeenCalledWith(
        purchaseOrderStatusMock.id,
        true,
      );
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a purchase order status', async () => {
      const purchaseOrderStatus = await controller.update(
        purchaseOrderStatusMock.id,
        updatePurchaseOrderStatusDtoMock,
      );
      expect(purchaseOrderStatus).toEqual(
        new ReturnPurchaseOrderStatusDto(purchaseOrderStatusMock),
      );
    });

    it('should return error if purchase order status is not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new Error('Purchase order status not found'));
      await expect(
        controller.update(purchaseOrderStatusMock.id, purchaseOrderStatusMock),
      ).rejects.toThrow('Purchase order status not found');
      expect(service.update).toHaveBeenCalledWith(
        purchaseOrderStatusMock.id,
        purchaseOrderStatusMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });
});
