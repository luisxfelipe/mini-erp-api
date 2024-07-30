import { Injectable } from '@nestjs/common';
import { CreateStockItemIdentifierDto } from './dto/create-stock-item-identifier.dto';
import { UpdateStockItemIdentifierDto } from './dto/update-stock-item-identifier.dto';

@Injectable()
export class StockItemIdentifiersService {
  create(createStockItemIdentifierDto: CreateStockItemIdentifierDto) {
    return 'This action adds a new stockItemIdentifier';
  }

  findAll() {
    return `This action returns all stockItemIdentifier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockItemIdentifier`;
  }

  update(
    id: number,
    updateStockItemIdentifierDto: UpdateStockItemIdentifierDto,
  ) {
    return `This action updates a #${id} stockItemIdentifier`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockItemIdentifier`;
  }
}
