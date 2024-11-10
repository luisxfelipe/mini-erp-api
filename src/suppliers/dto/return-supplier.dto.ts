import { Supplier } from '../entities/supplier.entity';

export class ReturnSupplierDto {
  id: number;
  corporateName: string;
  tradeName: string;
  cnpj?: string;
  email?: string;
  phone?: string;
  website?: string;

  constructor(supplier: Supplier) {
    this.id = supplier.id;
    this.corporateName = supplier.corporateName;
    this.tradeName = supplier.tradeName;
    this.cnpj = supplier.cnpj;
    this.email = supplier.email;
    this.phone = supplier.phone;
    this.website = supplier.website;
  }
}
