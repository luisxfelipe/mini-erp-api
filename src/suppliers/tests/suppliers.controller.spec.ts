import { Test, TestingModule } from '@nestjs/testing';
import { supplierMock } from './mocks/supplier.mock';
import { SuppliersController } from '../suppliers.controller';
import { SuppliersService } from '../suppliers.service';

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
});
