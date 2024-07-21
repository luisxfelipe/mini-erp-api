import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderStatusController } from './purchase-order-status.controller';
import { PurchaseOrderStatusService } from './purchase-order-status.service';

describe('PurchaseOrderStatusController', () => {
  let controller: PurchaseOrderStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderStatusController],
      providers: [PurchaseOrderStatusService],
    }).compile();

    controller = module.get<PurchaseOrderStatusController>(PurchaseOrderStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
