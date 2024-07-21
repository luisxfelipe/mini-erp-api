import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderItemsController } from './purchase-order-items.controller';
import { PurchaseOrderItemsService } from './purchase-order-items.service';

describe('PurchaseOrderItemsController', () => {
  let controller: PurchaseOrderItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderItemsController],
      providers: [PurchaseOrderItemsService],
    }).compile();

    controller = module.get<PurchaseOrderItemsController>(PurchaseOrderItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
