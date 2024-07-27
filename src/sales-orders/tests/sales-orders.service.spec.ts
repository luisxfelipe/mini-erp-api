import { Test, TestingModule } from '@nestjs/testing';
import { SalesOrdersService } from './sales-orders.service';

describe('SalesOrdersService', () => {
  let service: SalesOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesOrdersService],
    }).compile();

    service = module.get<SalesOrdersService>(SalesOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
