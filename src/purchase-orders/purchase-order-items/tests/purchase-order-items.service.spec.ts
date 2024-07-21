import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderItemsService } from './purchase-order-items.service';

describe('PurchaseOrderItemsService', () => {
  let service: PurchaseOrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseOrderItemsService],
    }).compile();

    service = module.get<PurchaseOrderItemsService>(PurchaseOrderItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
