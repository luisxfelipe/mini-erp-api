import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { SaleOrderRefund } from '../entities/sale-order-refund.entity';
import { SaleOrdersService } from './../../../sale-orders/sale-orders.service';
import { SaleOrderRefundsService } from '../sale-order-refunds.service';
import { saleOrderMock } from './../../../sale-orders/tests/mocks/sale-order.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { saleOrderRefundMock } from './mocks/sale-order-refund.mock';
import { createSaleOrderRefundMock } from './mocks/create-sale-order-refund.mock';
import { updateSaleOrderRefundMock } from './mocks/update-sale-order-refund.mock';
import { NotFoundException } from '@nestjs/common';

describe('SaleOrderRefundsService', () => {
  let service: SaleOrderRefundsService;
  let repository: Repository<SaleOrderRefund>;

  let saleOrdersService: SaleOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleOrderRefundsService,
        {
          provide: SaleOrdersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(saleOrderMock),
            calculateTotalValue: jest.fn().mockResolvedValue(100),
          },
        },
        {
          provide: getRepositoryToken(SaleOrderRefund),
          useValue: {
            create: jest.fn().mockReturnValue(saleOrderRefundMock),
            save: jest.fn().mockResolvedValue(saleOrderRefundMock),
            find: jest.fn().mockResolvedValue([saleOrderRefundMock]),
            findBy: jest.fn().mockResolvedValue([saleOrderRefundMock]),
            findOneOrFail: jest.fn().mockResolvedValue(saleOrderRefundMock),
          },
        },
      ],
    }).compile();

    service = module.get<SaleOrderRefundsService>(SaleOrderRefundsService);
    repository = module.get<Repository<SaleOrderRefund>>(
      getRepositoryToken(SaleOrderRefund),
    );
    saleOrdersService = module.get<SaleOrdersService>(SaleOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(saleOrdersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a sale order refund', async () => {
      const saleOrderRefund = await service.create(
        saleOrderMock.id,
        createSaleOrderRefundMock,
      );
      expect(saleOrderRefund).toEqual(saleOrderRefundMock);
    });

    it('should throw an error if the sale order does not exist', async () => {
      jest
        .spyOn(saleOrdersService, 'findOne')
        .mockRejectedValueOnce(new Error('Sale order not found'));
      await expect(
        service.create(saleOrderMock.id, createSaleOrderRefundMock),
      ).rejects.toThrow('Sale order not found');
    });
  });

  describe('findAll', () => {
    it('should return an array of sale order refunds', async () => {
      const saleOrderRefunds = await service.findAll(saleOrderMock.id);
      expect(saleOrderRefunds).toEqual([saleOrderRefundMock]);
    });
  });

  describe('findOne', () => {
    it('should return a sale order refund', async () => {
      const saleOrderRefund = await service.findOne(saleOrderMock.id, true);
      expect(saleOrderRefund).toEqual(saleOrderRefundMock);
    });

    it('should throw an error if the sale order does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOne(saleOrderMock.id, true)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a sale order refund', async () => {
      const saleOrderRefund = await service.update(
        saleOrderMock.id,
        updateSaleOrderRefundMock,
      );
      expect(saleOrderRefund).toEqual(saleOrderRefundMock);
    });

    it('should throw an error if the sale order does not exist', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.update(saleOrderMock.id, updateSaleOrderRefundMock),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
