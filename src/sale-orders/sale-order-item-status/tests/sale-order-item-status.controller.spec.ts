import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderItemStatusController } from '../sale-order-item-status.controller';
import { SaleOrderItemStatusService } from '../sale-order-item-status.service';
import { ReturnSaleOrderItemStatusDto } from '../dto/return-sale-order-item-status';
import { createSaleOrderItemStatusMock } from './mocks/create-sale-order-item-status.mock';
import { updateSaleOrderItemStatusMock } from './mocks/update-sale-order-item-status.mock';
import { saleOrderItemStatusMock } from './mocks/sale-order-item-status.mock';

describe('SaleOrderItemStatusController', () => {
  let controller: SaleOrderItemStatusController;
  let service: SaleOrderItemStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleOrderItemStatusController],
      providers: [
        {
          provide: SaleOrderItemStatusService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([saleOrderItemStatusMock]),
            create: jest.fn().mockResolvedValue(saleOrderItemStatusMock),
            update: jest.fn().mockResolvedValue(saleOrderItemStatusMock),
            findOne: jest.fn().mockResolvedValue(saleOrderItemStatusMock),
          },
        },
      ],
    }).compile();

    controller = module.get<SaleOrderItemStatusController>(
      SaleOrderItemStatusController,
    );
    service = module.get<SaleOrderItemStatusService>(
      SaleOrderItemStatusService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a sale order item status', async () => {
      const result = await controller.create(createSaleOrderItemStatusMock);
      expect(result).toEqual(
        new ReturnSaleOrderItemStatusDto(saleOrderItemStatusMock),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of sale order item status', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        new ReturnSaleOrderItemStatusDto(saleOrderItemStatusMock),
      ]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a sale order item status', async () => {
      const result = await controller.findOne(saleOrderItemStatusMock.id);
      expect(result).toEqual(
        new ReturnSaleOrderItemStatusDto(saleOrderItemStatusMock),
      );
      expect(service.findOne).toHaveBeenCalledWith(saleOrderItemStatusMock.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error if sale order item status is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new Error('Sale order item status not found'));
      await expect(
        controller.findOne(saleOrderItemStatusMock.id),
      ).rejects.toThrow('Sale order item status not found');
      expect(service.findOne).toHaveBeenCalledWith(saleOrderItemStatusMock.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a sale order item status', async () => {
      const result = await controller.update(
        saleOrderItemStatusMock.id,
        updateSaleOrderItemStatusMock,
      );
      expect(result).toEqual(
        new ReturnSaleOrderItemStatusDto(saleOrderItemStatusMock),
      );
    });

    it('should return error if sale order item status is not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new Error('Sale order item status not found'));
      await expect(
        controller.update(saleOrderItemStatusMock.id, saleOrderItemStatusMock),
      ).rejects.toThrow('Sale order item status not found');
      expect(service.update).toHaveBeenCalledWith(
        saleOrderItemStatusMock.id,
        saleOrderItemStatusMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });
});
