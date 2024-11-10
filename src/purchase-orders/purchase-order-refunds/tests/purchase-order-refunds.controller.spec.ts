import { Test, TestingModule } from '@nestjs/testing';
import { purchaseOrderRefundMock } from './mocks/purchase-order-refund.mock';
import { createPurchaseOrderRefundMock } from './mocks/create-purchase-order-refund.mock';
import { updatePurchaseOrderRefundMock } from './mocks/update-purchase-order-refund.mock';
import { PurchaseOrderRefundsController } from '../purchase-order-refunds.controller';
import { PurchaseOrderRefundsService } from '../purchase-order-refunds.service';
import { ReturnPurchaseOrderRefundDto } from '../dto/return-purchase-order-refund.dto';

describe('PurchaseOrderRefundsController', () => {
  let controller: PurchaseOrderRefundsController;
  let service: PurchaseOrderRefundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderRefundsController],
      providers: [
        {
          provide: PurchaseOrderRefundsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([purchaseOrderRefundMock]),
            create: jest.fn().mockResolvedValue(purchaseOrderRefundMock),
            remove: jest.fn().mockResolvedValue(purchaseOrderRefundMock),
            update: jest.fn().mockResolvedValue(purchaseOrderRefundMock),
            findOne: jest.fn().mockResolvedValue(purchaseOrderRefundMock),
          },
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderRefundsController>(
      PurchaseOrderRefundsController,
    );
    service = module.get<PurchaseOrderRefundsService>(
      PurchaseOrderRefundsService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a purchase order refund', async () => {
      const purchaseOrderRefund = await controller.create(
        createPurchaseOrderRefundMock,
        purchaseOrderRefundMock.purchaseOrderId,
      );
      expect(purchaseOrderRefund).toEqual(
        new ReturnPurchaseOrderRefundDto(purchaseOrderRefundMock),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of purchase order refunds', async () => {
      const purchaseOrderRefunds = await controller.findAll(
        purchaseOrderRefundMock.purchaseOrderId,
      );
      expect(purchaseOrderRefunds).toEqual([
        new ReturnPurchaseOrderRefundDto(purchaseOrderRefundMock),
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order refund', async () => {
      const purchaseOrderRefund = await controller.findOne(
        purchaseOrderRefundMock.id,
      );
      expect(purchaseOrderRefund).toEqual(
        new ReturnPurchaseOrderRefundDto(purchaseOrderRefundMock),
      );
    });
  });

  describe('update', () => {
    it('should return a purchase order refund', async () => {
      const purchaseOrderRefund = await controller.update(
        purchaseOrderRefundMock.id,
        updatePurchaseOrderRefundMock,
      );
      expect(purchaseOrderRefund).toEqual(
        new ReturnPurchaseOrderRefundDto(purchaseOrderRefundMock),
      );
    });
  });
});
