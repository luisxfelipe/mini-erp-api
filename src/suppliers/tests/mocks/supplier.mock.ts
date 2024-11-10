import { Supplier } from './../../entities/supplier.entity';

export const supplierMock: Supplier = {
  id: 1,

  corporateName: 'Supplier corporate name Mock',

  tradeName: 'Supplier trade name Mock',

  cnpj: '24358798250044',

  email: 'supplier@email.com',

  phone: '11970707070',

  website: 'wwww.supplier.com.br',

  createdAt: new Date(),

  updatedAt: new Date(),
};
