import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalePlatformsService } from './sale-platforms.service';
import { CreateSalePlatformDto } from './dto/create-sale-platform.dto';
import { UpdateSalePlatformDto } from './dto/update-sale-platform.dto';

@Controller('sale-platforms')
export class SalePlatformsController {
  constructor(private readonly salePlatformsService: SalePlatformsService) {}

  @Post()
  create(@Body() createSalePlatformDto: CreateSalePlatformDto) {
    return this.salePlatformsService.create(createSalePlatformDto);
  }

  @Get()
  findAll() {
    return this.salePlatformsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salePlatformsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalePlatformDto: UpdateSalePlatformDto) {
    return this.salePlatformsService.update(+id, updateSalePlatformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salePlatformsService.remove(+id);
  }
}
