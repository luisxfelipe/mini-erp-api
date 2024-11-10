import { Test, TestingModule } from '@nestjs/testing';
import { SalesPlatformCommissionsService } from './sales-platform-commissions.service';

describe('SalesPlatformCommissionsService', () => {
  let service: SalesPlatformCommissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesPlatformCommissionsService],
    }).compile();

    service = module.get<SalesPlatformCommissionsService>(SalesPlatformCommissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
