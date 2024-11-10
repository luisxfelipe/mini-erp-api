import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnCategoryDto } from './dto/return-category.dto';
import { DeleteResult } from 'typeorm';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(
      await this.categoriesService.create(createCategoryDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnCategoryDto[]> {
    return (await this.categoriesService.findAll()).map(
      (category) => new ReturnCategoryDto(category),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(await this.categoriesService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(
      await this.categoriesService.update(id, updateCategoryDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.categoriesService.remove(id);
  }
}
