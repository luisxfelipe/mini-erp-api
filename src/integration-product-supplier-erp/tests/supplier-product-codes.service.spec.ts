import { Test, TestingModule } from '@nestjs/testing';
import { SupplierProductCodesService } from './supplier-product-codes.service';

describe('SupplierProductCodesService', () => {
  let service: SupplierProductCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierProductCodesService],
    }).compile();

    service = module.get<SupplierProductCodesService>(SupplierProductCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
