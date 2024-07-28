import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderItemStatusController } from './sale-order-item-status.controller';
import { SaleOrderItemStatusService } from './sale-order-item-status.service';

describe('SaleOrderItemStatusController', () => {
  let controller: SaleOrderItemStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleOrderItemStatusController],
      providers: [SaleOrderItemStatusService],
    }).compile();

    controller = module.get<SaleOrderItemStatusController>(SaleOrderItemStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
