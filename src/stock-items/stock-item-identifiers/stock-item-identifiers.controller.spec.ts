import { Test, TestingModule } from '@nestjs/testing';
import { StockItemIdentifierController } from './stock-item-identifiers.controller';
import { StockItemIdentifierService } from './stock-item-identifiers.service';

describe('StockItemIdentifiersController', () => {
  let controller: StockItemIdentifiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockItemIdentifierController],
      providers: [StockItemIdentifierService],
    }).compile();

    controller = module.get<StockItemIdentifierController>(
      StockItemIdentifierController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
