import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { PurchaseOrdersController } from '../purchase-orders.controller';
import { purchaseOrderMock } from './mocks/purchase-order.mock';
import { returnPurchaseOrderMock } from './mocks/return-purchase-order.mock';
import { createPurchaseOrderMock } from './mocks/create-purchase-order.mock';
import { updatePurchaseOrderMock } from './mocks/update-purchase-order.mock';

describe('PurchaseOrdersController', () => {
  let controller: PurchaseOrdersController;
  let service: PurchaseOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrdersController],
      providers: [
        {
          provide: PurchaseOrdersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([purchaseOrderMock]),
            create: jest.fn().mockResolvedValue(purchaseOrderMock),
            update: jest.fn().mockResolvedValue(purchaseOrderMock),
            findOne: jest.fn().mockResolvedValue(purchaseOrderMock),
          },
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrdersController>(PurchaseOrdersController);
    service = module.get<PurchaseOrdersService>(PurchaseOrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a purchase order', async () => {
      const purchaseOrder = await controller.create(createPurchaseOrderMock);
      expect(purchaseOrder).toEqual(returnPurchaseOrderMock);
      expect(service.create).toHaveBeenCalledWith(createPurchaseOrderMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of purchase orders', async () => {
      const purchaseOrders = await controller.findAll();
      expect(purchaseOrders).toEqual([returnPurchaseOrderMock]);
      expect(service.findAll).toHaveBeenCalledWith(true);
    });
  });

  describe('findOne', () => {
    it('should return a purchase order', async () => {
      const purchaseOrder = await controller.findOne(purchaseOrderMock.id);
      expect(purchaseOrder).toEqual(returnPurchaseOrderMock);
      expect(service.findOne).toHaveBeenCalledWith(purchaseOrderMock.id, true);
    });
  });

  describe('update', () => {
    it('should return a purchase order', async () => {
      const purchaseOrder = await controller.update(
        purchaseOrderMock.id,
        updatePurchaseOrderMock,
      );
      expect(purchaseOrder).toEqual(returnPurchaseOrderMock);
      expect(service.update).toHaveBeenCalledWith(
        purchaseOrderMock.id,
        updatePurchaseOrderMock,
      );
    });
  });
});
