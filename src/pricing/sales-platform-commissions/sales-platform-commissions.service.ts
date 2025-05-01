import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalesPlatformCommissionDto } from './dto/create-sales-platform-commission.dto';
import { UpdateSalesPlatformCommissionDto } from './dto/update-sales-platform-commission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesPlatformCommission } from './entities/sales-platform-commission.entity';
import { Repository } from 'typeorm';
import { PlatformsService } from 'src/platforms/platforms.service';

@Injectable()
export class SalesPlatformCommissionsService {
  constructor(
    @InjectRepository(SalesPlatformCommission)
    private readonly repository: Repository<SalesPlatformCommission>,
    @Inject(forwardRef(() => PlatformsService))
    private readonly platformsService: PlatformsService,
  ) { }

  async countSalesPlatformCommissionsByPlatform(
    platformId: number,
  ): Promise<number> {
    return await this.repository.count({
      where: { salePlatformId: platformId },
    });
  }

  async create(
    createSalesPlatformCommissionDto: CreateSalesPlatformCommissionDto,
  ): Promise<SalesPlatformCommission> {
    const salePlatformCommision = await this.findOneByPlatformId(
      createSalesPlatformCommissionDto.salePlatformId,
    ).catch(() => undefined);

    if (salePlatformCommision) {
      throw new NotFoundException('Sales platform commission already exists');
    }

    const platform = await this.platformsService.findOne(
      createSalesPlatformCommissionDto.salePlatformId,
    );

    const salesPlatformCommission = this.repository.create(
      createSalesPlatformCommissionDto,
    );

    const savedSalesPlatformCommission = await this.repository.save(
      salesPlatformCommission,
    );

    return {
      ...savedSalesPlatformCommission,
      salePlatform: platform,
    };
  }

  async findAll(): Promise<SalesPlatformCommission[]> {
    return this.repository.find();
  }

  async findOneByPlatformId(
    platformId: number,
  ): Promise<SalesPlatformCommission> {
    try {
      return await this.repository.findOne({
        where: { salePlatformId: platformId },
      });
    } catch (error) {
      throw new NotFoundException('Sales platform commission not found');
    }
  }

  async findOne(id: number): Promise<SalesPlatformCommission> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Sales platform commission not found');
    }
  }

  async update(
    id: number,
    updateSalesPlatformCommissionDto: UpdateSalesPlatformCommissionDto,
  ): Promise<SalesPlatformCommission> {
    try {
      await this.repository.update(id, updateSalesPlatformCommissionDto);

      return await this.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
