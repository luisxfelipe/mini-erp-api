import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { ReturnPricingDto } from './dto/return-pricing.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateSalePriceDto } from './dto/create-sale-price.dto';
import { FindPricingByProductPlatformDto } from './dto/find-pricing-by-product-platform.dto';

@Controller('pricing')
@ApiTags('Pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post('/calculate')
  async calculate(
    @Body() createSalePriceDto: CreateSalePriceDto,
  ): Promise<number> {
    return await this.pricingService.calculateSalePrice(createSalePriceDto);
  }

  @Post()
  async create(
    @Body() createPricingDto: CreatePricingDto,
  ): Promise<ReturnPricingDto> {
    return new ReturnPricingDto(
      await this.pricingService.create(createPricingDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnPricingDto[]> {
    return (await this.pricingService.findAll()).map(
      (pricing) => new ReturnPricingDto(pricing),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnPricingDto> {
    return new ReturnPricingDto(await this.pricingService.findOne(+id));
  }

  @Post('/find-by-product-and-platform')
  async findOneByProductAndPlatformId(
    @Body() findPricingByProductPlatformDto: FindPricingByProductPlatformDto,
  ): Promise<ReturnPricingDto> {
    return new ReturnPricingDto(
      await this.pricingService.findOneByProductAndPlatformId(
        findPricingByProductPlatformDto,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePricingDto: UpdatePricingDto,
  ): Promise<ReturnPricingDto> {
    return new ReturnPricingDto(
      await this.pricingService.update(+id, updatePricingDto),
    );
  }
}
