import { Test, TestingModule } from '@nestjs/testing';
import { supplierMock } from './mocks/supplier.mock';
import { SuppliersController } from '../suppliers.controller';
import { SuppliersService } from '../suppliers.service';
import { ReturnSupplierDto } from '../dto/return-supplier.dto';

describe('SuppliersController', () => {
  let controller: SuppliersController;
  let service: SuppliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuppliersController],
      providers: [
        {
          provide: SuppliersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([supplierMock]),
            create: jest.fn().mockResolvedValue(supplierMock),
            update: jest.fn().mockResolvedValue(supplierMock),
            findOne: jest.fn().mockResolvedValue(supplierMock),
          },
        },
      ],
    }).compile();

    controller = module.get<SuppliersController>(SuppliersController);
    service = module.get<SuppliersService>(SuppliersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a supplier', async () => {
      const result = await controller.create(supplierMock);
      expect(result).toEqual(new ReturnSupplierDto(supplierMock));
    });
  });

  describe('findAll', () => {
    it('should return an array of suppliers', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([new ReturnSupplierDto(supplierMock)]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a supplier', async () => {
      const result = await controller.findOne(supplierMock.id);
      expect(result).toEqual(new ReturnSupplierDto(supplierMock));
    });
  });

  describe('update', () => {
    it('should return a supplier', async () => {
      const result = await controller.update(supplierMock.id, supplierMock);
      expect(result).toEqual(new ReturnSupplierDto(supplierMock));
    });
  });
});
