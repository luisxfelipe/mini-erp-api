import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderStatusService } from './purchase-order-status.service';

describe('PurchaseOrderStatusService', () => {
  let service: PurchaseOrderStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseOrderStatusService],
    }).compile();

    service = module.get<PurchaseOrderStatusService>(PurchaseOrderStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
