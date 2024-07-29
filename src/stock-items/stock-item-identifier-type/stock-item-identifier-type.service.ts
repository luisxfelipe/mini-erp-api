import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockItemIdentifierTypeDto } from './dto/create-stock-item-identifier-type.dto';
import { UpdateStockItemIdentifierTypeDto } from './dto/update-stock-item-identifier-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockItemIdentifierType } from './entities/stock-item-identifier-type.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class StockItemIdentifierTypeService {
  constructor(
    @InjectRepository(StockItemIdentifierType)
    private readonly repository: Repository<StockItemIdentifierType>,
  ) {}

  async create(
    createStockItemIdentifierTypeDto: CreateStockItemIdentifierTypeDto,
  ): Promise<StockItemIdentifierType> {
    const stockItemStatus = await this.findOneByName(
      createStockItemIdentifierTypeDto.name,
    ).catch(() => undefined);

    if (stockItemStatus) {
      throw new BadRequestException(
        'Stock Item identifier type already exists',
      );
    }

    return await this.repository.save(
      this.repository.create(createStockItemIdentifierTypeDto),
    );
  }

  async findAll(): Promise<StockItemIdentifierType[]> {
    return this.repository.find();
  }

  async findOneByName(name: string): Promise<StockItemIdentifierType> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Stock Item identifier type not found');
    }
  }

  async findOne(id: number): Promise<StockItemIdentifierType> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Stock Item identifier type not found');
    }
  }

  async update(
    id: number,
    updateStockItemIdentifierTypeDto: UpdateStockItemIdentifierTypeDto,
  ): Promise<StockItemIdentifierType> {
    const result = await this.findOne(id);
    return this.repository.save({
      ...result,
      ...updateStockItemIdentifierTypeDto,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.repository.delete(id);
  }
}
