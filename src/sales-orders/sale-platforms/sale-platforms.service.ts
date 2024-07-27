import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalePlatformDto } from './dto/create-sale-platform.dto';
import { UpdateSalePlatformDto } from './dto/update-sale-platform.dto';
import { SalePlatform } from './entities/sale-platform.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class SalePlatformsService {
  constructor(
    @InjectRepository(SalePlatform)
    private readonly repository: Repository<SalePlatform>,
  ) {}

  async create(
    createSalePlatformDto: CreateSalePlatformDto,
  ): Promise<SalePlatform> {
    const salePlatform = await this.findOneByName(
      createSalePlatformDto.name,
    ).catch(() => undefined);

    if (salePlatform) {
      throw new BadRequestException('Sale platform already exists');
    }

    return await this.repository.save(
      this.repository.create(createSalePlatformDto),
    );
  }

  async findAll(): Promise<SalePlatform[]> {
    return this.repository.find();
  }

  async findOneByName(name: string): Promise<SalePlatform> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Sale platform not found');
    }
  }

  async findOne(id: number): Promise<SalePlatform> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Sale platform not found');
    }
  }

  async update(
    id: number,
    updateSalePlatformDto: UpdateSalePlatformDto,
  ): Promise<SalePlatform> {
    const salePlatform = await this.findOne(id);
    return this.repository.save({ ...salePlatform, ...updateSalePlatformDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
