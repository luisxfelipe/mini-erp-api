import { Test, TestingModule } from '@nestjs/testing';
import { saleOrderRefundMock } from './mocks/sale-order-refund.mock';
import { createSaleOrderRefundMock } from './mocks/create-sale-order-refund.mock';
import { ReturnSaleOrderRefundDto } from '../dto/return-sale-order-refund.dto';
import { updateSaleOrderRefundMock } from './mocks/update-sale-order-refund.mock';
import { SaleOrderRefundsService } from '../sale-order-refunds.service';
import { SaleOrderRefundsController } from '../sale-order-refunds.controller';

describe('SaleOrderRefundsController', () => {
  let controller: SaleOrderRefundsController;
  let service: SaleOrderRefundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleOrderRefundsController],
      providers: [
        {
          provide: SaleOrderRefundsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([saleOrderRefundMock]),
            create: jest.fn().mockResolvedValue(saleOrderRefundMock),
            remove: jest.fn().mockResolvedValue(saleOrderRefundMock),
            update: jest.fn().mockResolvedValue(saleOrderRefundMock),
            findOne: jest.fn().mockResolvedValue(saleOrderRefundMock),
          },
        },
      ],
    }).compile();

    controller = module.get<SaleOrderRefundsController>(
      SaleOrderRefundsController,
    );
    service = module.get<SaleOrderRefundsService>(SaleOrderRefundsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a sale order refund', async () => {
      const saleOrderRefund = await controller.create(
        createSaleOrderRefundMock,
        saleOrderRefundMock.saleOrderId,
      );
      expect(saleOrderRefund).toEqual(
        new ReturnSaleOrderRefundDto(saleOrderRefundMock),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of sale order refunds', async () => {
      const saleOrderRefunds = await controller.findAll(
        saleOrderRefundMock.saleOrderId,
      );
      expect(saleOrderRefunds).toEqual([
        new ReturnSaleOrderRefundDto(saleOrderRefundMock),
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a sale order refund', async () => {
      const saleOrderRefund = await controller.findOne(saleOrderRefundMock.id);
      expect(saleOrderRefund).toEqual(
        new ReturnSaleOrderRefundDto(saleOrderRefundMock),
      );
    });
  });

  describe('update', () => {
    it('should return a sale order refund', async () => {
      const saleOrderRefund = await controller.update(
        saleOrderRefundMock.id,
        updateSaleOrderRefundMock,
      );
      expect(saleOrderRefund).toEqual(
        new ReturnSaleOrderRefundDto(saleOrderRefundMock),
      );
    });
  });
});
