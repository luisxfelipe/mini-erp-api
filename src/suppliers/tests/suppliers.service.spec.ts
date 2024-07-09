import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';
import { SuppliersService } from '../suppliers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { supplierMock } from './../tests/mocks/supplier.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { updateSupplierMock } from './../tests/mocks/update-supplier.mock';
import { createSupplierMock } from './../tests/mocks/create-supplier.mock';

describe('SuppliersService', () => {
  let service: SuppliersService;
  let repository: Repository<Supplier>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuppliersService,
        {
          provide: getRepositoryToken(Supplier),
          useValue: {
            find: jest.fn().mockResolvedValue([supplierMock]),
            findByCnpjOrEmail: jest.fn().mockResolvedValue([supplierMock]),
            findOneOrFail: jest.fn().mockResolvedValue(supplierMock),
            create: jest.fn().mockReturnValue(supplierMock),
            save: jest.fn().mockResolvedValue(supplierMock),
          },
        },
      ],
    }).compile();

    service = module.get<SuppliersService>(SuppliersService);
    repository = module.get<Repository<Supplier>>(getRepositoryToken(Supplier));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should return an error if supplier already exists', async () => {
      expect(service.create(createSupplierMock)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create a supplier', async () => {
      jest.spyOn(service, 'findByCnpjOrEmail').mockResolvedValueOnce([]);

      const supplier = await service.create(createSupplierMock);

      expect(supplier).toEqual(supplierMock);
    });

    it('should return an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.create(createSupplierMock)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of suppliers', async () => {
      const suppliers = await service.findAll();

      expect(suppliers).toEqual([supplierMock]);
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      const suppliers = await service.findAll();

      expect(suppliers).toEqual([]);
    });
  });

  describe('findByCnpjOrEmail', () => {
    it('should return an array of suppliers', async () => {
      const suppliers = await service.findByCnpjOrEmail(
        supplierMock.cnpj,
        supplierMock.email,
      );

      expect(suppliers).toEqual([supplierMock]);
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      const suppliers = await service.findAll();

      expect(suppliers).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a supplier', async () => {
      const supplier = await service.findOne(supplierMock.id);

      expect(supplier).toEqual(supplierMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findOne(supplierMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a supplier', async () => {
      const spy = jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValueOnce(supplierMock);
      const supplier = await service.update(
        supplierMock.id,
        updateSupplierMock,
      );

      expect(supplier).toEqual(supplierMock);
      expect(spy).toBeCalledTimes(1);
    });

    it('should send new supplier to save', async () => {
      const spy = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(supplierMock);
      await service.update(supplierMock.id, updateSupplierMock);

      console.log('spy: ', spy.mock.calls[0][0]);

      expect(spy.mock.calls[0][0]).toEqual({
        ...supplierMock,
        ...updateSupplierMock,
      });
    });
  });
});
