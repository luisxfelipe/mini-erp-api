import { PartialType } from '@nestjs/swagger';
import { CreateSupplierProductCodeDto } from './create-supplier-product-code.dto';

export class UpdateSupplierProductCodeDto extends PartialType(CreateSupplierProductCodeDto) {}
