import { ReturnSupplierDto } from './../../../suppliers/dto/return-supplier.dto';
import { supplierMock } from './supplier.mock';

export const returnSupplierMock: ReturnSupplierDto = {
  id: supplierMock.id,
  corporateName: supplierMock.corporateName,
  tradeName: supplierMock.tradeName,
  cnpj: supplierMock.cnpj,
  email: supplierMock.email,
  phone: supplierMock.phone,
  website: supplierMock.website,
};
