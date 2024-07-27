import { Test, TestingModule } from '@nestjs/testing';
import { SalePlatformsController } from './sale-platforms.controller';
import { SalePlatformsService } from './sale-platforms.service';

describe('SalePlatformsController', () => {
  let controller: SalePlatformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalePlatformsController],
      providers: [SalePlatformsService],
    }).compile();

    controller = module.get<SalePlatformsController>(SalePlatformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
