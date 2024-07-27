import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SaleStatusService } from './sale-status.service';
import { CreateSaleStatusDto } from './dto/create-sale-status.dto';
import { UpdateSaleStatusDto } from './dto/update-sale-status.dto';
import { ReturnSaleStatusDto } from './dto/return-sale-status.dto';
import { DeleteResult } from 'typeorm';

@Controller('sale-status')
export class SaleStatusController {
  constructor(private readonly saleStatusService: SaleStatusService) {}

  @Post()
  async create(
    @Body() createSaleStatusDto: CreateSaleStatusDto,
  ): Promise<ReturnSaleStatusDto> {
    return new ReturnSaleStatusDto(
      await this.saleStatusService.create(createSaleStatusDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnSaleStatusDto[]> {
    return (await this.saleStatusService.findAll()).map(
      (saleStatus) => new ReturnSaleStatusDto(saleStatus),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnSaleStatusDto> {
    return new ReturnSaleStatusDto(await this.saleStatusService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleStatusDto: UpdateSaleStatusDto,
  ): Promise<ReturnSaleStatusDto> {
    return new ReturnSaleStatusDto(
      await this.saleStatusService.update(id, updateSaleStatusDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.saleStatusService.remove(id);
  }
}
