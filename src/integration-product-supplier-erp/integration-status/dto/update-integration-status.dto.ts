import { PartialType } from '@nestjs/swagger';
import { CreateIntegrationStatusDto } from './create-integration-status.dto';

export class UpdateIntegrationStatusDto extends PartialType(CreateIntegrationStatusDto) {}
