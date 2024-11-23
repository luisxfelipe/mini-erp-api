import { IntegrationStatus } from '../entities/integration-status.entity';

export class ReturnIntegrationStatusDto {
  id: number;
  name: string;

  constructor(integrationStatus: IntegrationStatus) {
    this.id = integrationStatus.id;
    this.name = integrationStatus.name;
  }
}
