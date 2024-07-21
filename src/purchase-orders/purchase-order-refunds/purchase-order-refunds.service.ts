import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderRefundDto } from './dto/create-purchase-order-refund.dto';
import { UpdatePurchaseOrderRefundDto } from './dto/update-purchase-order-refund.dto';
import { PurchaseOrderRefund } from './entities/purchase-order-refund.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseOrderRefundsService {
  constructor(
    @InjectRepository(PurchaseOrderRefund)
    private readonly repository: Repository<PurchaseOrderRefund>,
    @Inject(PurchaseOrdersService)
    private readonly purchaseOrdersService: PurchaseOrdersService,
  ) {}

  async create(
    purchaseOrderId: number,
    createPurchaseOrderRefundDto: CreatePurchaseOrderRefundDto,
  ): Promise<PurchaseOrderRefund> {
    await this.purchaseOrdersService.findOne(purchaseOrderId);

    return await this.repository.save(
      this.repository.create({
        ...createPurchaseOrderRefundDto,
        purchaseOrderId,
      }),
    );
  }

  async findAll(purchaseOrderId: number): Promise<PurchaseOrderRefund[]> {
    return await this.repository.findBy({ purchaseOrderId });
  }

  async findOne(
    id: number,
    isRelations?: boolean,
  ): Promise<PurchaseOrderRefund> {
    try {
      const status = await this.repository.findOneOrFail({
        where: { id },
        relations: {
          purchaseOrder: isRelations ? true : false,
        },
      });

      return status;
    } catch (error) {
      throw new NotFoundException('Purchase order refund not found');
    }
  }

  async update(
    id: number,
    updatePurchaseOrderRefundDto: UpdatePurchaseOrderRefundDto,
  ): Promise<PurchaseOrderRefund> {
    const purchaseOrderRefund = await this.findOne(id);

    return await this.repository.save({
      ...purchaseOrderRefund,
      ...updatePurchaseOrderRefundDto,
    });
  }
}
