import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseOrderStatusDto } from './dto/create-purchase-order-status.dto';
import { UpdatePurchaseOrderStatusDto } from './dto/update-purchase-order-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderStatus } from './entities/purchase-order-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseOrderStatusService {
  constructor(
    @InjectRepository(PurchaseOrderStatus)
    private readonly repository: Repository<PurchaseOrderStatus>,
  ) {}

  async create(
    createPurchaseOrderStatusDto: CreatePurchaseOrderStatusDto,
  ): Promise<PurchaseOrderStatus> {
    const purchaseOrder = await this.findOneByName(
      createPurchaseOrderStatusDto.name,
    ).catch(() => undefined);

    if (purchaseOrder) {
      throw new BadRequestException('Purchase order already exists');
    }

    return await this.repository.save(
      this.repository.create(createPurchaseOrderStatusDto),
    );
  }

  async findAll(): Promise<PurchaseOrderStatus[]> {
    return await this.repository.find();
  }

  async findOne(
    id: number,
    isRelations?: boolean,
  ): Promise<PurchaseOrderStatus> {
    try {
      const purchaseOrderStatus = await this.repository.findOneOrFail({
        where: { id },
        relations: {
          purchaseOrders: isRelations ? true : false,
        },
      });

      return purchaseOrderStatus;
    } catch (error) {
      throw new NotFoundException('Purchase order not found');
    }
  }

  async findOneByName(name: string): Promise<PurchaseOrderStatus> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Purchase order not found');
    }
  }

  async update(
    id: number,
    updatePurchaseOrderStatusDto: UpdatePurchaseOrderStatusDto,
  ): Promise<PurchaseOrderStatus> {
    const purchaseOrder = await this.findOne(id);

    return await this.repository.save({
      ...purchaseOrder,
      ...updatePurchaseOrderStatusDto,
    });
  }
}
