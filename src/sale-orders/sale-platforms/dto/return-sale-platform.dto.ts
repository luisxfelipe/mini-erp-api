import { SalePlatform } from '../entities/sale-platform.entity';

export class ReturnSalePlatformDto {
  id: number;
  name: string;

  constructor(salePlatform: SalePlatform) {
    this.id = salePlatform.id;
    this.name = salePlatform.name;
  }
}
