import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SupplierProductCodesService } from './supplier-product-codes.service';
import { CreateSupplierProductCodeDto } from './dto/create-supplier-product-code.dto';
import { UpdateSupplierProductCodeDto } from './dto/update-supplier-product-code.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReturnSupplierProductCodeDto } from './dto/return-supplier-product-code.dto';

@Controller('supplier-product-codes')
@ApiTags('Supplier Product Codes')
export class SupplierProductCodesController {
  constructor(
    private readonly supplierProductCodesService: SupplierProductCodesService,
  ) {}

  @Post()
  async create(
    @Body() createSupplierProductCodeDto: CreateSupplierProductCodeDto,
  ): Promise<ReturnSupplierProductCodeDto> {
    return new ReturnSupplierProductCodeDto(
      await this.supplierProductCodesService.create(
        createSupplierProductCodeDto,
      ),
    );
  }

  @Get()
  async findAll(): Promise<ReturnSupplierProductCodeDto[]> {
    return (await this.supplierProductCodesService.findAll()).map(
      (supplierProductCode) =>
        new ReturnSupplierProductCodeDto(supplierProductCode),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ReturnSupplierProductCodeDto> {
    return new ReturnSupplierProductCodeDto(
      await this.supplierProductCodesService.findOne(+id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSupplierProductCodeDto: UpdateSupplierProductCodeDto,
  ): Promise<ReturnSupplierProductCodeDto> {
    return new ReturnSupplierProductCodeDto(
      await this.supplierProductCodesService.update(
        +id,
        updateSupplierProductCodeDto,
      ),
    );
  }
}
