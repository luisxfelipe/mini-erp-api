import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnSupplierDto } from './dto/return-supplier.dto';

@Controller('suppliers')
@ApiTags('Suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<ReturnSupplierDto> {
    return new ReturnSupplierDto(
      await this.suppliersService.create(createSupplierDto),
    );
  }

  @Get()
  async findAll(): Promise<ReturnSupplierDto[]> {
    return (await this.suppliersService.findAll()).map((supplier) => {
      return new ReturnSupplierDto(supplier);
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnSupplierDto> {
    return new ReturnSupplierDto(await this.suppliersService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<ReturnSupplierDto> {
    return new ReturnSupplierDto(
      await this.suppliersService.update(id, updateSupplierDto),
    );
  }
}
