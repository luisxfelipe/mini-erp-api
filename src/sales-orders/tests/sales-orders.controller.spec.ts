import { Test, TestingModule } from '@nestjs/testing';
import { saleOrderMock } from './mocks/sale-order.mock';
import { SalesOrdersController } from '../sales-orders.controller';
import { SalesOrdersService } from '../sales-orders.service';
import { createSalesOrderMock } from './mocks/create-sale-order.mock';
import { ReturnSaleOrderDto } from '../dto/return-sale-order.dto';
import { updateSalesOrderMock } from './mocks/update-sale-order.mock';

describe('SalesOrdersController', () => {
  let controller: SalesOrdersController;
  let service: SalesOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesOrdersController],
      providers: [
        {
          provide: SalesOrdersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([saleOrderMock]),
            create: jest.fn().mockResolvedValue(saleOrderMock),
            update: jest.fn().mockResolvedValue(saleOrderMock),
            findOne: jest.fn().mockResolvedValue(saleOrderMock),
          },
        },
      ],
    }).compile();

    controller = module.get<SalesOrdersController>(SalesOrdersController);
    service = module.get<SalesOrdersService>(SalesOrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a sale order', async () => {
      const saleOrder = await controller.create(createSalesOrderMock);
      expect(saleOrder).toEqual(new ReturnSaleOrderDto(saleOrderMock));
      expect(service.create).toHaveBeenCalledWith(createSalesOrderMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of sales orders', async () => {
      const salesOrder = await controller.findAll();
      expect(salesOrder).toEqual([new ReturnSaleOrderDto(saleOrderMock)]);
      expect(service.findAll).toHaveBeenCalledWith(true);
    });
  });

  describe('findOne', () => {
    it('should return a sale order', async () => {
      const saleOrder = await controller.findOne(
        new ReturnSaleOrderDto(saleOrderMock).id,
      );
      expect(saleOrder).toEqual(new ReturnSaleOrderDto(saleOrderMock));
      expect(service.findOne).toHaveBeenCalledWith(saleOrderMock.id, true);
    });
  });

  describe('update', () => {
    it('should return a sale order', async () => {
      const saleOrder = await controller.update(
        saleOrderMock.id,
        updateSalesOrderMock,
      );
      expect(saleOrder).toEqual(new ReturnSaleOrderDto(saleOrderMock));
      expect(service.update).toHaveBeenCalledWith(
        saleOrderMock.id,
        updateSalesOrderMock,
      );
    });
  });
});
