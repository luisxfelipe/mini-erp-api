import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockItemIdentifierDto } from './dto/create-stock-item-identifier.dto';
import { UpdateStockItemIdentifierDto } from './dto/update-stock-item-identifier.dto';
import { Repository } from 'typeorm';
import { StockItemIdentifier } from './entities/stock-item-identifier.entity';
import { StockItemIdentifierTypesService } from '../stock-item-identifier-types/stock-item-identifier-types.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StockItemIdentifiersService {
  constructor(
    @InjectRepository(StockItemIdentifier)
    private repository: Repository<StockItemIdentifier>,
    @Inject(StockItemIdentifierTypesService)
    private readonly stockItemIdentifierTypesService: StockItemIdentifierTypesService,
  ) {}

  async create(
    createStockItemIdentifierDto: CreateStockItemIdentifierDto,
  ): Promise<StockItemIdentifier> {
    await this.stockItemIdentifierTypesService.findOne(
      createStockItemIdentifierDto.stockItemIdentifierTypeId,
    );
    return await this.repository.save({
      ...createStockItemIdentifierDto,
    });
  }

  async findAll(): Promise<StockItemIdentifier[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<StockItemIdentifier> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Stock item identifier not found');
    }
  }

  async update(
    id: number,
    updateStockItemIdentifierDto: UpdateStockItemIdentifierDto,
  ): Promise<StockItemIdentifier> {
    const stockItemIdentifier = await this.findOne(id);
    return await this.repository.save({
      ...stockItemIdentifier,
      ...updateStockItemIdentifierDto,
    });
  }
}
