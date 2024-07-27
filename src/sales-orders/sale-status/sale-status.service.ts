import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleStatusDto } from './dto/create-sale-status.dto';
import { UpdateSaleStatusDto } from './dto/update-sale-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleStatus } from './entities/sale-status.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class SaleStatusService {
  constructor(
    @InjectRepository(SaleStatus)
    private readonly repository: Repository<SaleStatus>,
  ) {}

  async create(createSaleStatusDto: CreateSaleStatusDto): Promise<SaleStatus> {
    const saleStatus = await this.findOneByName(createSaleStatusDto.name).catch(
      () => undefined,
    );

    if (saleStatus) {
      throw new BadRequestException('Sale status already exists');
    }

    return await this.repository.save(
      this.repository.create(createSaleStatusDto),
    );
  }

  async findAll(): Promise<SaleStatus[]> {
    return this.repository.find();
  }

  async findOneByName(name: string): Promise<SaleStatus> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Sale status not found');
    }
  }

  async findOne(id: number): Promise<SaleStatus> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Sale status not found');
    }
  }

  async update(
    id: number,
    updateSaleStatusDto: UpdateSaleStatusDto,
  ): Promise<SaleStatus> {
    const saleStatus = await this.findOne(id);
    return this.repository.save({ ...saleStatus, ...updateSaleStatusDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
