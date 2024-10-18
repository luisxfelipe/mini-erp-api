import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { Platform } from './entities/platform.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private readonly repository: Repository<Platform>,
  ) {}

  async create(createPlatformDto: CreatePlatformDto): Promise<Platform> {
    const platform = await this.findOneByName(createPlatformDto.name).catch(
      () => undefined,
    );

    if (platform) {
      throw new BadRequestException('Platform already exists');
    }

    return await this.repository.save(
      this.repository.create(createPlatformDto),
    );
  }

  async findAll(): Promise<Platform[]> {
    return this.repository.find();
  }

  async findOneByName(name: string): Promise<Platform> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Platform not found');
    }
  }

  async findOne(id: number): Promise<Platform> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Platform not found');
    }
  }

  async update(
    id: number,
    updatePlatformDto: UpdatePlatformDto,
  ): Promise<Platform> {
    const platform = await this.findOne(id);
    return this.repository.save({ ...platform, ...updatePlatformDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
