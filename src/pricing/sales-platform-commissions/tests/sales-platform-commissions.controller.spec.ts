import { Test, TestingModule } from '@nestjs/testing';
import { SalesPlatformCommissionsController } from './sales-platform-commissions.controller';
import { SalesPlatformCommissionsService } from './sales-platform-commissions.service';

describe('SalesPlatformCommissionsController', () => {
  let controller: SalesPlatformCommissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesPlatformCommissionsController],
      providers: [SalesPlatformCommissionsService],
    }).compile();

    controller = module.get<SalesPlatformCommissionsController>(SalesPlatformCommissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
