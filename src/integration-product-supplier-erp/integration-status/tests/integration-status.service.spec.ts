import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationStatusService } from './integration-status.service';

describe('IntegrationStatusService', () => {
  let service: IntegrationStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegrationStatusService],
    }).compile();

    service = module.get<IntegrationStatusService>(IntegrationStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
