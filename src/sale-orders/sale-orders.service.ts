import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleOrderDto } from './dto/create-sales-order.dto';
import { UpdateSaleOrderDto } from './dto/update-sale-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformsService } from '../platforms/platforms.service';
import { SaleStatusService } from './sale-status/sale-status.service';
import { SaleOrder } from './entities/sale-order.entity';
import { SaleOrderItemsService } from './sale-order-items/sale-order-items.service';

@Injectable()
export class SaleOrdersService {
  constructor(
    @InjectRepository(SaleOrder)
    private repository: Repository<SaleOrder>,
    @Inject(SaleOrderItemsService)
    private readonly saleOrderItemsService: SaleOrderItemsService,
    @Inject(PlatformsService)
    private readonly platformsService: PlatformsService,
    @Inject(SaleStatusService)
    private readonly saleStatusService: SaleStatusService,
  ) { }

  async calculateTotalValue(saleOrderId: number): Promise<number> {
    const saleOrder = await this.findOne(saleOrderId);

    const totalValueSaleOrderItems =
      await this.saleOrderItemsService.calculateTotalValue(saleOrderId);

    const totalValue =
      totalValueSaleOrderItems +
      ((saleOrder.shippingCost || 0) - (saleOrder.discount || 0));

    return parseFloat(totalValue.toFixed(2));
  }

  async countSaleOrdersByPlatform(platformId: number): Promise<number> {
    const platform = await this.platformsService.findOne(platformId);
    return await this.repository.count({ where: { platform } });
  }

  async create(createSaleOrderDto: CreateSaleOrderDto): Promise<SaleOrder> {
    await this.platformsService.findOne(createSaleOrderDto.platformId);
    await this.saleStatusService.findOne(createSaleOrderDto.statusId);

    return await this.repository.save(
      this.repository.create(createSaleOrderDto),
    );
  }

  async findAll(isFindRelations?: boolean): Promise<SaleOrder[]> {
    let findOptions = {};
    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          saleStatus: true,
          platform: true,
        },
      };
    }

    return await this.repository.find(findOptions);
  }

  async findOne(id: number, isRelation?: boolean): Promise<SaleOrder> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
        ...(isRelation && { relations: ['saleStatus', 'platform'] }),
      });
    } catch (error) {
      throw new NotFoundException('Sale order not found');
    }
  }

  async update(
    id: number,
    updateSaleOrderDto: UpdateSaleOrderDto,
  ): Promise<SaleOrder> {
    if (updateSaleOrderDto.platformId) {
      await this.platformsService.findOne(updateSaleOrderDto.platformId);
    }
    if (updateSaleOrderDto.statusId) {
      await this.saleStatusService.findOne(updateSaleOrderDto.statusId);
    }

    const saleOrder = await this.findOne(id);

    return await this.repository.save({
      ...saleOrder,
      ...updateSaleOrderDto,
    });
  }
}
