import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderItemStatusService } from './sale-order-item-status.service';

describe('SaleOrderItemStatusService', () => {
  let service: SaleOrderItemStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleOrderItemStatusService],
    }).compile();

    service = module.get<SaleOrderItemStatusService>(SaleOrderItemStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
