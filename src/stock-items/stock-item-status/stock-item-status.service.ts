import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockItemStatusDto } from './dto/create-stock-item-status.dto';
import { UpdateStockItemStatusDto } from './dto/update-stock-item-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockItemStatus } from './entities/stock-item-status.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class StockItemStatusService {
  constructor(
    @InjectRepository(StockItemStatus)
    private readonly repository: Repository<StockItemStatus>,
  ) {}

  async create(
    createStockItemStatusDto: CreateStockItemStatusDto,
  ): Promise<StockItemStatus> {
    const stockItemStatus = await this.findOneByName(
      createStockItemStatusDto.name,
    ).catch(() => undefined);

    if (stockItemStatus) {
      throw new BadRequestException('Stock Item status already exists');
    }

    return await this.repository.save(
      this.repository.create(createStockItemStatusDto),
    );
  }

  async findAll(): Promise<StockItemStatus[]> {
    return this.repository.find();
  }

  async findOneByName(name: string): Promise<StockItemStatus> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Stock Item status not found');
    }
  }

  async findOne(id: number): Promise<StockItemStatus> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Stock Item status not found');
    }
  }

  async update(
    id: number,
    updateStockItemStatusDto: UpdateStockItemStatusDto,
  ): Promise<StockItemStatus> {
    const stockItemStatus = await this.findOne(id);
    return this.repository.save({
      ...stockItemStatus,
      ...updateStockItemStatusDto,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
