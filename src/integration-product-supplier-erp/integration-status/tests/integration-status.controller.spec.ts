import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationStatusController } from './integration-status.controller';
import { IntegrationStatusService } from './integration-status.service';

describe('IntegrationStatusController', () => {
  let controller: IntegrationStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationStatusController],
      providers: [IntegrationStatusService],
    }).compile();

    controller = module.get<IntegrationStatusController>(IntegrationStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
