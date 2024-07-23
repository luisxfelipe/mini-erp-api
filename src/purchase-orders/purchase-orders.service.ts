import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuppliersService } from './../suppliers/suppliers.service';
import { PurchaseOrderStatusService } from './purchase-order-status/purchase-order-status.service';
import { PurchaseOrderItemsService } from './purchase-order-items/purchase-order-items.service';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private repository: Repository<PurchaseOrder>,
    @Inject(PurchaseOrderItemsService)
    private readonly purchaseOrderItemsService: PurchaseOrderItemsService,
    @Inject(PurchaseOrderStatusService)
    private readonly purchaseOrderStatusService: PurchaseOrderStatusService,
    @Inject(SuppliersService)
    private readonly suppliersService: SuppliersService,
  ) {}

  async calculateTotalValue(purchaseOrderId: number): Promise<number> {
    const purchaseOrder = await this.findOne(purchaseOrderId);

    const totalValuePurchaseOrderItems =
      await this.purchaseOrderItemsService.calculateTotalValue(purchaseOrderId);

    const totalValue =
      totalValuePurchaseOrderItems +
      ((purchaseOrder.shippingCost || 0) - (purchaseOrder.discount || 0));

    return parseFloat(totalValue.toFixed(2));
  }

  async create(
    createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    await this.suppliersService.findOne(createPurchaseOrderDto.supplierId);
    await this.purchaseOrderStatusService.findOne(
      createPurchaseOrderDto.purchaseOrderStatusId,
    );

    return await this.repository.save(
      this.repository.create(createPurchaseOrderDto),
    );
  }

  async findAll(isFindRelations?: boolean): Promise<PurchaseOrder[]> {
    let findOptions = {};
    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          purchaseOrderStatus: true,
          supplier: true,
        },
      };
    }

    return await this.repository.find(findOptions);
  }

  async findOne(id: number, isRelation?: boolean): Promise<PurchaseOrder> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
        ...(isRelation && { relations: ['purchaseOrderStatus', 'supplier'] }),
      });
    } catch (error) {
      throw new NotFoundException('Purchase order not found');
    }
  }

  async update(
    id: number,
    updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    if (updatePurchaseOrderDto.supplierId) {
      await this.suppliersService.findOne(updatePurchaseOrderDto.supplierId);
    }
    if (updatePurchaseOrderDto.purchaseOrderStatusId) {
      await this.purchaseOrderStatusService.findOne(
        updatePurchaseOrderDto.purchaseOrderStatusId,
      );
    }

    const purchaseOrder = await this.findOne(id);

    return await this.repository.save({
      ...purchaseOrder,
      ...updatePurchaseOrderDto,
    });
  }
}
