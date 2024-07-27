import { Test, TestingModule } from '@nestjs/testing';
import { saleStatusMock } from './mocks/sale-status.mock';
import { returnDeleteMock } from './../../../mocks/return-delete.mock';
import { SaleStatusController } from '../sale-status.controller';
import { SaleStatusService } from '../sale-status.service';
import { ReturnSaleStatusDto } from '../dto/return-sale-status.dto';

describe('SaleStatusController', () => {
  let controller: SaleStatusController;
  let service: SaleStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleStatusController],
      providers: [
        {
          provide: SaleStatusService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([saleStatusMock]),
            create: jest.fn().mockResolvedValue(saleStatusMock),
            update: jest.fn().mockResolvedValue(saleStatusMock),
            findOne: jest.fn().mockResolvedValue(saleStatusMock),
            remove: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    controller = module.get<SaleStatusController>(SaleStatusController);
    service = module.get<SaleStatusService>(SaleStatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a sale status', async () => {
      const saleStatus = await controller.create(saleStatusMock);
      expect(saleStatus).toEqual(new ReturnSaleStatusDto(saleStatusMock));
      expect(service.create).toHaveBeenCalledWith(saleStatusMock);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of sale status', async () => {
      const saleStatus = await controller.findAll();
      expect(saleStatus).toEqual([new ReturnSaleStatusDto(saleStatusMock)]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a sale status', async () => {
      const saleStatus = await controller.findOne(saleStatusMock.id);
      expect(saleStatus).toEqual(new ReturnSaleStatusDto(saleStatusMock));
      expect(service.findOne).toHaveBeenCalledWith(saleStatusMock.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error if sale status is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      await expect(controller.findOne(saleStatusMock.id)).rejects.toThrow();
      expect(service.findOne).toHaveBeenCalledWith(saleStatusMock.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a sale status', async () => {
      const saleStatus = await controller.update(
        saleStatusMock.id,
        saleStatusMock,
      );
      expect(saleStatus).toEqual(new ReturnSaleStatusDto(saleStatusMock));
      expect(service.update).toHaveBeenCalledWith(
        saleStatusMock.id,
        saleStatusMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should return error if sale status is not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      await expect(
        controller.update(saleStatusMock.id, saleStatusMock),
      ).rejects.toThrow();
      expect(service.update).toHaveBeenCalledWith(
        saleStatusMock.id,
        saleStatusMock,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete a sale status', async () => {
      const saleStatus = await service.remove(saleStatusMock.id);

      expect(saleStatus).toEqual(returnDeleteMock);
    });

    it('should return error if sale status is not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new Error('Sale Status not found'));
      await expect(service.remove(saleStatusMock.id)).rejects.toThrow();
      expect(service.remove).toHaveBeenCalledWith(saleStatusMock.id);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
