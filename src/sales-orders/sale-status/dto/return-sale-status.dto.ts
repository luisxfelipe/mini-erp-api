import { SaleStatus } from '../entities/sale-status.entity';

export class ReturnSaleStatusDto {
  id: number;
  name: string;

  constructor(saleStatus: SaleStatus) {
    this.id = saleStatus.id;
    this.name = saleStatus.name;
  }
}
