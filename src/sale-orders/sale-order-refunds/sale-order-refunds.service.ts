import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleOrderRefundDto } from './dto/create-sale-order-refund.dto';
import { UpdateSaleOrderRefundDto } from './dto/update-sale-order-refund.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleOrderRefund } from './entities/sale-order-refund.entity';
import { SaleOrdersService } from '../sale-orders.service';

@Injectable()
export class SaleOrderRefundsService {
  constructor(
    @InjectRepository(SaleOrderRefund)
    private readonly repository: Repository<SaleOrderRefund>,
    @Inject(SaleOrdersService)
    private readonly saleOrdersService: SaleOrdersService,
  ) {}

  async calculateTotalValue(saleOrderId: number): Promise<number> {
    const saleOrderRefunds = await this.findAll(saleOrderId);
    const totalValue = saleOrderRefunds.reduce((total, saleOrderRefund) => {
      const amount = Number(saleOrderRefund.amount);
      return isNaN(amount) ? total : total + amount;
    }, 0);
    return Number(totalValue.toFixed(2));
  }

  async create(
    saleOrderId: number,
    createSaleOrderRefundDto: CreateSaleOrderRefundDto,
  ): Promise<SaleOrderRefund> {
    await this.saleOrdersService.findOne(saleOrderId);

    //Verifica se o valor a ser reebolsado é menor que o valor total da compra
    const totalValueSaleOrder =
      await this.saleOrdersService.calculateTotalValue(saleOrderId);

    const totalValueRefunds = await this.calculateTotalValue(saleOrderId);

    const totalValueSaleOrderWithRefunds =
      totalValueSaleOrder - totalValueRefunds;

    if (createSaleOrderRefundDto.amount > totalValueSaleOrderWithRefunds) {
      throw new BadRequestException(
        'The value to be refunded is greater than the total value of the sale order',
      );
    }

    return await this.repository.save(
      this.repository.create({
        ...createSaleOrderRefundDto,
        saleOrderId,
      }),
    );
  }

  async findAll(saleOrderId: number): Promise<SaleOrderRefund[]> {
    return await this.repository.findBy({ saleOrderId });
  }

  async findOne(id: number, isRelations?: boolean): Promise<SaleOrderRefund> {
    try {
      const status = await this.repository.findOneOrFail({
        where: { id },
        relations: {
          saleOrder: isRelations ? true : false,
        },
      });

      return status;
    } catch (error) {
      throw new NotFoundException('Sale order refund not found');
    }
  }

  async update(
    id: number,
    updateSaleOrderRefundDto: UpdateSaleOrderRefundDto,
  ): Promise<SaleOrderRefund> {
    const saleOrderRefund = await this.findOne(id);

    return await this.repository.save({
      ...saleOrderRefund,
      ...updateSaleOrderRefundDto,
    });
  }
}
