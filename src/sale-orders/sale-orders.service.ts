import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleOrderDto } from './dto/create-sales-order.dto';
import { UpdateSaleOrderDto } from './dto/update-sale-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalePlatformsService } from './sale-platforms/sale-platforms.service';
import { SaleStatusService } from './sale-status/sale-status.service';
import { SaleOrder } from './entities/sale-order.entity';

@Injectable()
export class SaleOrdersService {
  constructor(
    @InjectRepository(SaleOrder)
    private repository: Repository<SaleOrder>,
    @Inject(SalePlatformsService)
    private readonly salePlatformsService: SalePlatformsService,
    @Inject(SaleStatusService)
    private readonly saleStatusService: SaleStatusService,
  ) {}

  async create(createSaleOrderDto: CreateSaleOrderDto): Promise<SaleOrder> {
    await this.salePlatformsService.findOne(createSaleOrderDto.platformId);
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
          salePlatform: true,
        },
      };
    }

    return await this.repository.find(findOptions);
  }

  async findOne(id: number, isRelation?: boolean): Promise<SaleOrder> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
        ...(isRelation && { relations: ['saleStatus', 'salePlatform'] }),
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
      await this.salePlatformsService.findOne(updateSaleOrderDto.platformId);
    }
    if (updateSaleOrderDto.statusId) {
      await this.saleStatusService.findOne(updateSaleOrderDto.statusId);
    }

    const purchaseOrder = await this.findOne(id);

    return await this.repository.save({
      ...purchaseOrder,
      ...updateSaleOrderDto,
    });
  }
}
