import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalePlatformsService } from './sale-platforms/sale-platforms.service';
import { SaleStatusService } from './sale-status/sale-status.service';
import { SaleOrder } from './entities/sales-order.entity';

@Injectable()
export class SalesOrdersService {
  constructor(
    @InjectRepository(SaleOrder)
    private repository: Repository<SaleOrder>,
    @Inject(SalePlatformsService)
    private readonly salePlatformsService: SalePlatformsService,
    @Inject(SaleStatusService)
    private readonly saleStatusService: SaleStatusService,
  ) {}

  async create(createSalesOrderDto: CreateSalesOrderDto): Promise<SaleOrder> {
    await this.salePlatformsService.findOne(createSalesOrderDto.platformId);
    await this.saleStatusService.findOne(createSalesOrderDto.statusId);

    return await this.repository.save(
      this.repository.create(createSalesOrderDto),
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
    updateSalesOrderDto: UpdateSalesOrderDto,
  ): Promise<SaleOrder> {
    if (updateSalesOrderDto.platformId) {
      await this.salePlatformsService.findOne(updateSalesOrderDto.platformId);
    }
    if (updateSalesOrderDto.statusId) {
      await this.saleStatusService.findOne(updateSalesOrderDto.statusId);
    }

    const purchaseOrder = await this.findOne(id);

    return await this.repository.save({
      ...purchaseOrder,
      ...updateSalesOrderDto,
    });
  }
}
