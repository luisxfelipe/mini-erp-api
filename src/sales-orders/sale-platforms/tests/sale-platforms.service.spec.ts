import { Test, TestingModule } from '@nestjs/testing';
import { SalePlatformsService } from './sale-platforms.service';

describe('SalePlatformsService', () => {
  let service: SalePlatformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalePlatformsService],
    }).compile();

    service = module.get<SalePlatformsService>(SalePlatformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
