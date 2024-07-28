import { Injectable } from '@nestjs/common';
import { CreateStockItemDto } from './dto/create-stock-item.dto';
import { UpdateStockItemDto } from './dto/update-stock-item.dto';

@Injectable()
export class StockItemsService {
  create(createStockItemDto: CreateStockItemDto) {
    return 'This action adds a new stockItem';
  }

  findAll() {
    return `This action returns all stockItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockItem`;
  }

  update(id: number, updateStockItemDto: UpdateStockItemDto) {
    return `This action updates a #${id} stockItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockItem`;
  }
}
