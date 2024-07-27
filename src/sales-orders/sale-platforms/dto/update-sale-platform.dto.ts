import { PartialType } from '@nestjs/swagger';
import { CreateSalePlatformDto } from './create-sale-platform.dto';

export class UpdateSalePlatformDto extends PartialType(CreateSalePlatformDto) {}
