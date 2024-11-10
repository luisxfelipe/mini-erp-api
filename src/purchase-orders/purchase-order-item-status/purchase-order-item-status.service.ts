import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseOrderItemStatusDto } from './dto/create-purchase-order-item-status.dto';
import { UpdatePurchaseOrderItemStatusDto } from './dto/update-purchase-order-item-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderItemStatus } from './entities/purchase-order-item-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseOrderItemStatusService {
  constructor(
    @InjectRepository(PurchaseOrderItemStatus)
    private readonly repository: Repository<PurchaseOrderItemStatus>,
  ) {}

  async create(
    createPurchaseOrderItemStatusDto: CreatePurchaseOrderItemStatusDto,
  ): Promise<PurchaseOrderItemStatus> {
    const result = await this.findOneByName(
      createPurchaseOrderItemStatusDto.name,
    ).catch(() => undefined);

    if (result) {
      throw new BadRequestException(
        'Purchase order item status already exists',
      );
    }

    return await this.repository.save(
      this.repository.create(createPurchaseOrderItemStatusDto),
    );
  }

  async findAll(): Promise<PurchaseOrderItemStatus[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<PurchaseOrderItemStatus> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Purchase order item status not found');
    }
  }

  async findOneByName(name: string): Promise<PurchaseOrderItemStatus> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Purchase order item status not found');
    }
  }

  async update(
    id: number,
    updatePurchaseOrderItemStatusDto: UpdatePurchaseOrderItemStatusDto,
  ): Promise<PurchaseOrderItemStatus> {
    const result = await this.findOne(id);

    return await this.repository.save({
      ...result,
      ...updatePurchaseOrderItemStatusDto,
    });
  }
}
