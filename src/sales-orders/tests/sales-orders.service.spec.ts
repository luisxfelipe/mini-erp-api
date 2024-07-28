import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrder } from '../entities/sales-order.entity';
import { Repository } from 'typeorm';
import { SalePlatformsService } from '../sale-platforms/sale-platforms.service';
import { SaleStatusService } from '../sale-status/sale-status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SalesOrdersService } from '../sales-orders.service';
import { saleOrderMock } from './mocks/sale-order.mock';
import { platformMock } from '../sale-platforms/tests/mocks/platform.mock';
import { saleStatusMock } from '../sale-status/tests/mocks/sale-status.mock';
import { createSalesOrderMock } from './mocks/create-sale-order.mock';
import { NotFoundException } from '@nestjs/common';
import { updateSalesOrderMock } from './mocks/update-sale-order.mock';

describe('SalesOrdersService', () => {
  let service: SalesOrdersService;
  let repository: Repository<SaleOrder>;

  let salePlatformsService: SalePlatformsService;
  let saleStatusService: SaleStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesOrdersService,
        {
          provide: getRepositoryToken(SaleOrder),
          useValue: {
            find: jest.fn().mockResolvedValue([saleOrderMock]),
            findOneOrFail: jest.fn().mockResolvedValue(saleOrderMock),
            findOneByOrFail: jest.fn().mockResolvedValue(saleOrderMock),
            create: jest.fn().mockReturnValue(saleOrderMock),
            save: jest.fn().mockResolvedValue(saleOrderMock),
          },
        },
        {
          provide: SalePlatformsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(platformMock),
          },
        },
        {
          provide: SaleStatusService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(saleStatusMock),
          },
        },
      ],
    }).compile();

    service = module.get<SalesOrdersService>(SalesOrdersService);
    repository = module.get<Repository<SaleOrder>>(
      getRepositoryToken(SaleOrder),
    );

    salePlatformsService =
      module.get<SalePlatformsService>(SalePlatformsService);
    saleStatusService = module.get<SaleStatusService>(SaleStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(salePlatformsService).toBeDefined();
    expect(saleStatusService).toBeDefined();
  });

  describe('create', () => {
    it('should create a sale order', async () => {
      jest
        .spyOn(salePlatformsService, 'findOne')
        .mockResolvedValue(platformMock);
      jest
        .spyOn(saleStatusService, 'findOne')
        .mockResolvedValue(saleStatusMock);
      const result = await service.create(createSalesOrderMock);
      expect(result).toEqual(saleOrderMock);

      expect(repository.create).toHaveBeenCalledWith(createSalesOrderMock);
      expect(repository.save).toHaveBeenCalledWith(saleOrderMock);
      expect(salePlatformsService.findOne).toHaveBeenCalledWith(
        createSalesOrderMock.platformId,
      );
      expect(saleStatusService.findOne).toHaveBeenCalledWith(
        createSalesOrderMock.statusId,
      );
    });

    it('should throw an error if platform not found', async () => {
      jest
        .spyOn(salePlatformsService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      jest
        .spyOn(saleStatusService, 'findOne')
        .mockResolvedValue(saleStatusMock);

      await expect(service.create(createSalesOrderMock)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if sale status not found', async () => {
      jest
        .spyOn(salePlatformsService, 'findOne')
        .mockResolvedValue(platformMock);

      jest
        .spyOn(saleStatusService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(service.create(createSalesOrderMock)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of sales orders', async () => {
      const result = await service.findAll();
      expect(result).toEqual([saleOrderMock]);
    });
  });

  describe('findOne', () => {
    it('should return a sale order', async () => {
      const result = await service.findOne(saleOrderMock.id);
      expect(result).toEqual(saleOrderMock);
    });

    it('should throw an error if sale order not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      expect(service.findOne(saleOrderMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a sale order', async () => {
      const result = await service.update(
        saleOrderMock.id,
        updateSalesOrderMock,
      );
      expect(result).toEqual(saleOrderMock);
    });

    it('should throw an error if sale order not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      expect(
        service.update(saleOrderMock.id, updateSalesOrderMock),
      ).rejects.toThrow(NotFoundException);
    });
  });
});