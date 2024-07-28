import { ReturnSaleStatusDto } from '../../dto/return-sale-status.dto';
import { saleStatusMock } from './sale-status.mock';

export const returnStatusMock: ReturnSaleStatusDto = {
  id: saleStatusMock.id,
  name: saleStatusMock.name,
};
