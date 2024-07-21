import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderRefundsController } from './purchase-order-refunds.controller';
import { PurchaseOrderRefundsService } from './purchase-order-refunds.service';

describe('PurchaseOrderRefundsController', () => {
  let controller: PurchaseOrderRefundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderRefundsController],
      providers: [PurchaseOrderRefundsService],
    }).compile();

    controller = module.get<PurchaseOrderRefundsController>(PurchaseOrderRefundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
