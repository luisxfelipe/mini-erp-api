import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIntegrationStatusDto } from './dto/create-integration-status.dto';
import { UpdateIntegrationStatusDto } from './dto/update-integration-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegrationStatus } from './entities/integration-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IntegrationStatusService {
  constructor(
    @InjectRepository(IntegrationStatus)
    private readonly repository: Repository<IntegrationStatus>,
  ) {}

  async create(
    createIntegrationStatusDto: CreateIntegrationStatusDto,
  ): Promise<IntegrationStatus> {
    const result = await this.findOneByName(
      createIntegrationStatusDto.name,
    ).catch(() => undefined);

    if (result) {
      throw new BadRequestException('Integration status already exists');
    }

    return await this.repository.save(
      this.repository.create(createIntegrationStatusDto),
    );
  }

  async findAll(): Promise<IntegrationStatus[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<IntegrationStatus> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Integration status not found');
    }
  }

  async findOneByName(name: string): Promise<IntegrationStatus> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Integration status not found');
    }
  }

  async update(
    id: number,
    updateIntegrationStatusDto: UpdateIntegrationStatusDto,
  ): Promise<IntegrationStatus> {
    const integrationStatus = await this.findOne(id);

    return await this.repository.save({
      ...integrationStatus,
      ...updateIntegrationStatusDto,
    });
  }
}
