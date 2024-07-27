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
import { SalePlatformsService } from './sale-platforms.service';
import { CreateSalePlatformDto } from './dto/create-sale-platform.dto';
import { UpdateSalePlatformDto } from './dto/update-sale-platform.dto';
import { ReturnSalePlatformDto } from './dto/return-sale-platform.dto';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('sale-platforms')
@ApiTags('Sale platforms')
export class SalePlatformsController {
  constructor(private readonly salePlatformsService: SalePlatformsService) {}

  @Post()
  async create(
    @Body() createSalePlatformDto: CreateSalePlatformDto,
  ): Promise<ReturnSalePlatformDto> {
    return new ReturnSalePlatformDto(
      await this.salePlatformsService.create(createSalePlatformDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnSalePlatformDto[]> {
    return (await this.salePlatformsService.findAll()).map(
      (salePlatform) => new ReturnSalePlatformDto(salePlatform),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnSalePlatformDto> {
    return new ReturnSalePlatformDto(
      await this.salePlatformsService.findOne(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSalePlatformDto: UpdateSalePlatformDto,
  ): Promise<ReturnSalePlatformDto> {
    return new ReturnSalePlatformDto(
      await this.salePlatformsService.update(id, updateSalePlatformDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.salePlatformsService.remove(id);
  }
}
