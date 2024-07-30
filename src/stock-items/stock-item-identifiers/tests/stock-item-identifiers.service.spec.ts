import { Test, TestingModule } from '@nestjs/testing';
import { StockItemIdentifierService } from './stock-item-identifiers.service';

describe('StockItemIdentifiersService', () => {
  let service: StockItemIdentifiersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockItemIdentifierService],
    }).compile();

    service = module.get<StockItemIdentifierService>(
      StockItemIdentifierService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
