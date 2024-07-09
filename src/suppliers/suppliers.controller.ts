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
  create(
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<ReturnSupplierDto> {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  findAll(): Promise<ReturnSupplierDto[]> {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ReturnSupplierDto> {
    return this.suppliersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<ReturnSupplierDto> {
    return this.suppliersService.update(+id, updateSupplierDto);
  }
}
