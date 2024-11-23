import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { IntegrationStatusService } from './integration-status.service';
import { CreateIntegrationStatusDto } from './dto/create-integration-status.dto';
import { UpdateIntegrationStatusDto } from './dto/update-integration-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnIntegrationStatusDto } from './dto/return-integration-status.dto';

@Controller('integration-status')
@ApiTags('Integration Status')
export class IntegrationStatusController {
  constructor(
    private readonly integrationStatusService: IntegrationStatusService,
  ) {}

  @Post()
  async create(
    @Body() createIntegrationStatusDto: CreateIntegrationStatusDto,
  ): Promise<ReturnIntegrationStatusDto> {
    return new ReturnIntegrationStatusDto(
      await this.integrationStatusService.create(createIntegrationStatusDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnIntegrationStatusDto[]> {
    return (await this.integrationStatusService.findAll()).map(
      (status) => new ReturnIntegrationStatusDto(status),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnIntegrationStatusDto> {
    return new ReturnIntegrationStatusDto(
      await this.integrationStatusService.findOne(+id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIntegrationStatusDto: UpdateIntegrationStatusDto,
  ): Promise<ReturnIntegrationStatusDto> {
    return new ReturnIntegrationStatusDto(
      await this.integrationStatusService.update(
        +id,
        updateIntegrationStatusDto,
      ),
    );
  }
}
