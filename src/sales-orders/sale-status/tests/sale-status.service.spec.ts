import { Test, TestingModule } from '@nestjs/testing';
import { SaleStatus } from '../entities/sale-status.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { saleStatusMock } from './mocks/sale-status.mock';
import { returnDeleteMock } from './../../../mocks/return-delete.mock';
import { SaleStatusService } from '../sale-status.service';
import { createSaleStatusMock } from './mocks/create-sale-status.mock';
import { updateSaleStatusMock } from './mocks/update-sale-status.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SaleStatusService', () => {
  let service: SaleStatusService;
  let repository: Repository<SaleStatus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleStatusService,
        {
          provide: getRepositoryToken(SaleStatus),
          useValue: {
            find: jest.fn().mockResolvedValue([saleStatusMock]),
            findOneOrFail: jest.fn().mockResolvedValue(saleStatusMock),
            findOneByOrFail: jest.fn().mockResolvedValue(saleStatusMock),
            create: jest.fn().mockReturnValue(saleStatusMock),
            save: jest.fn().mockResolvedValue(saleStatusMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<SaleStatusService>(SaleStatusService);
    repository = module.get<Repository<SaleStatus>>(
      getRepositoryToken(SaleStatus),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a sale status', async () => {
      jest.spyOn(service, 'findOneByName').mockResolvedValueOnce(undefined);

      const platform = await service.create(createSaleStatusMock);

      expect(platform).toEqual(saleStatusMock);
      expect(repository.save).toHaveBeenCalledWith(saleStatusMock);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(service.findOneByName).toHaveBeenCalledTimes(1);
    });

    it('should return an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.create(createSaleStatusMock)).rejects.toThrow(Error);
    });

    it('should throw BadRequestException if sale status already exists', async () => {
      jest
        .spyOn(service, 'findOneByName')
        .mockResolvedValueOnce(saleStatusMock);
      await expect(service.create(createSaleStatusMock)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of platforms', async () => {
      const saleStatus = await service.findAll();

      expect(saleStatus).toEqual([saleStatusMock]);
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      const saleStatus = await service.findAll();

      expect(saleStatus).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a sale status', async () => {
      const saleStatus = await service.findOne(saleStatusMock.id);

      expect(saleStatus).toEqual(saleStatusMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findOne(saleStatusMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findOneByName', () => {
    it('should return a sale status', async () => {
      const result = await service.findOneByName(saleStatusMock.name);
      expect(result).toEqual(saleStatusMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOneByName('NonExistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a sale status', async () => {
      const result = await service.update(
        saleStatusMock.id,
        updateSaleStatusMock,
      );

      expect(result).toEqual(saleStatusMock);
    });

    it('should throw NotFoundException if sale status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.update(saleStatusMock.id, updateSaleStatusMock),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a sale status', async () => {
      const result = await service.remove(saleStatusMock.id);
      expect(result).toEqual(returnDeleteMock);
    });

    it('should throw NotFoundException if sale status is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.remove(saleStatusMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
