import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { Platform } from './entities/platform.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SaleOrdersService } from 'src/sale-orders/sale-orders.service';
import { SalesPlatformCommissionsService } from 'src/pricing/sales-platform-commissions/sales-platform-commissions.service';
import { PricingService } from 'src/pricing/pricing.service';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private readonly repository: Repository<Platform>,
    @Inject(forwardRef(() => PricingService))
    private readonly pricingService: PricingService,
    @Inject(forwardRef(() => SaleOrdersService))
    private readonly saleOrdersService: SaleOrdersService,
    @Inject(forwardRef(() => SalesPlatformCommissionsService))
    private readonly salesPlatformCommissionsService: SalesPlatformCommissionsService,
  ) { }

  async create(createPlatformDto: CreatePlatformDto): Promise<Platform> {
    const platform = await this.findOneByName(createPlatformDto.name).catch(
      () => undefined,
    );

    if (platform) {
      throw new BadRequestException('Platform already exists');
    }

    return await this.repository.save(
      this.repository.create(createPlatformDto),
    );
  }

  async findAll(): Promise<Platform[]> {
    return this.repository.find();
  }

  async findOneByName(name: string): Promise<Platform> {
    try {
      return await this.repository.findOneByOrFail({ name });
    } catch (error) {
      throw new NotFoundException('Platform not found');
    }
  }

  async findOne(id: number): Promise<Platform> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Platform not found');
    }
  }

  async update(
    id: number,
    updatePlatformDto: UpdatePlatformDto,
  ): Promise<Platform> {
    const platform = await this.findOne(id);
    return this.repository.save({ ...platform, ...updatePlatformDto });
  }

  async remove(id: number): Promise<Platform> {
    const platform = await this.findOne(id);

    const quantitySaleOrders =
      await this.saleOrdersService.countSaleOrdersByPlatform(id);

    if (quantitySaleOrders > 0) {
      throw new BadRequestException(
        'Platform cannot be deleted because it has sale orders associated with it',
      );
    }

    const quantitySalesPlatformCommissions =
      await this.salesPlatformCommissionsService.countSalesPlatformCommissionsByPlatform(id);

    if (quantitySalesPlatformCommissions > 0) {
      throw new BadRequestException(
        'Platform cannot be deleted because it has sales platform commissions associated with it',
      );
    }

    const quantityPricing = await this.pricingService.countPricingByPlatform(id);

    if (quantityPricing > 0) {
      throw new BadRequestException(
        'Platform cannot be deleted because it has pricing associated with it',
      );
    }

    return await this.repository.softRemove(platform);
  }

  async restore(id: number): Promise<Platform> {
    await this.repository.restore(id);
    return await this.findOne(id);
  }
}
