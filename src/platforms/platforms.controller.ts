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
import { PlatformsService } from './platforms.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { ReturnPlatformDto } from './dto/return-platform.dto';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('platforms')
@ApiTags('Platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Post()
  async create(
    @Body() createPlatformDto: CreatePlatformDto,
  ): Promise<ReturnPlatformDto> {
    return new ReturnPlatformDto(
      await this.platformsService.create(createPlatformDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnPlatformDto[]> {
    return (await this.platformsService.findAll()).map(
      (platform) => new ReturnPlatformDto(platform),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnPlatformDto> {
    return new ReturnPlatformDto(await this.platformsService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlatformDto: UpdatePlatformDto,
  ): Promise<ReturnPlatformDto> {
    return new ReturnPlatformDto(
      await this.platformsService.update(id, updatePlatformDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.platformsService.remove(id);
  }
}
