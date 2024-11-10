import { Test, TestingModule } from '@nestjs/testing';
import { saleOrderMock } from './mocks/sale-order.mock';
import { SaleOrdersController } from '../sale-orders.controller';
import { SaleOrdersService } from '../sale-orders.service';
import { createSaleOrderMock } from './mocks/create-sale-order.mock';
import { ReturnSaleOrderDto } from '../dto/return-sale-order.dto';
import { updateSaleOrderMock } from './mocks/update-sale-order.mock';

describe('SaleOrdersController', () => {
  let controller: SaleOrdersController;
  let service: SaleOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleOrdersController],
      providers: [
        {
          provide: SaleOrdersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([saleOrderMock]),
            create: jest.fn().mockResolvedValue(saleOrderMock),
            update: jest.fn().mockResolvedValue(saleOrderMock),
            findOne: jest.fn().mockResolvedValue(saleOrderMock),
          },
        },
      ],
    }).compile();

    controller = module.get<SaleOrdersController>(SaleOrdersController);
    service = module.get<SaleOrdersService>(SaleOrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a sale order', async () => {
      const saleOrder = await controller.create(createSaleOrderMock);
      expect(saleOrder).toEqual(new ReturnSaleOrderDto(saleOrderMock));
      expect(service.create).toHaveBeenCalledWith(createSaleOrderMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of sale orders', async () => {
      const saleOrder = await controller.findAll();
      expect(saleOrder).toEqual([new ReturnSaleOrderDto(saleOrderMock)]);
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
        updateSaleOrderMock,
      );
      expect(saleOrder).toEqual(new ReturnSaleOrderDto(saleOrderMock));
      expect(service.update).toHaveBeenCalledWith(
        saleOrderMock.id,
        updateSaleOrderMock,
      );
    });
  });
});
