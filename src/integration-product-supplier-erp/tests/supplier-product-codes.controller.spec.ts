import { Test, TestingModule } from '@nestjs/testing';
import { SupplierProductCodesController } from './supplier-product-codes.controller';
import { SupplierProductCodesService } from './supplier-product-codes.service';

describe('SupplierProductCodesController', () => {
  let controller: SupplierProductCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierProductCodesController],
      providers: [SupplierProductCodesService],
    }).compile();

    controller = module.get<SupplierProductCodesController>(SupplierProductCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
