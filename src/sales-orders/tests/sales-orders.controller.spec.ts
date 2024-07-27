import { Test, TestingModule } from '@nestjs/testing';
import { SalesOrdersController } from './sales-orders.controller';
import { SalesOrdersService } from './sales-orders.service';

describe('SalesOrdersController', () => {
  let controller: SalesOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesOrdersController],
      providers: [SalesOrdersService],
    }).compile();

    controller = module.get<SalesOrdersController>(SalesOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
