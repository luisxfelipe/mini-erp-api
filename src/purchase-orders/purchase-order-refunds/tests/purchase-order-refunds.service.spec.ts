import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderRefundsService } from './purchase-order-refunds.service';

describe('PurchaseOrderRefundsService', () => {
  let service: PurchaseOrderRefundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseOrderRefundsService],
    }).compile();

    service = module.get<PurchaseOrderRefundsService>(PurchaseOrderRefundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
