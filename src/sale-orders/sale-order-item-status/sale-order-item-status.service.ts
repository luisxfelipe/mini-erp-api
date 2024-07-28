import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleOrderItemStatusDto } from './dto/create-sale-order-item-status.dto';
import { UpdateSaleOrderItemStatusDto } from './dto/update-sale-order-item-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleOrderItemStatus } from './entities/sale-order-item-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleOrderItemStatusService {
  constructor(
    @InjectRepository(SaleOrderItemStatus)
    private readonly repository: Repository<SaleOrderItemStatus>,
  ) {}

  async create(
    createSaleOrderItemStatusDto: CreateSaleOrderItemStatusDto,
  ): Promise<SaleOrderItemStatus> {
    const result = await this.findOneByName(
      createSaleOrderItemStatusDto.name,
    ).catch(() => undefined);

    if (result) {
      throw new BadRequestException('Sale order item status already exists');
    }

    return await this.repository.save(
      this.repository.create(createSaleOrderItemStatusDto),
    );
  }

  async findAll(): Promise<SaleOrderItemStatus[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<SaleOrderItemStatus> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Sale order item status not found');
    }
  }

  async findOneByName(name: string): Promise<SaleOrderItemStatus> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Sale order item status not found');
    }
  }

  async update(
    id: number,
    updateSaleOrderItemStatusDto: UpdateSaleOrderItemStatusDto,
  ): Promise<SaleOrderItemStatus> {
    const result = await this.findOne(id);

    return await this.repository.save({
      ...result,
      ...updateSaleOrderItemStatusDto,
    });
  }
}
