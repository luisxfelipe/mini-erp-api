import { Test, TestingModule } from '@nestjs/testing';
import { SalePlatformsService } from '../sale-platforms.service';
import { Repository } from 'typeorm';
import { SalePlatform } from '../entities/sale-platform.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createSalePlatformMock } from './mocks/create-sale-platform.mock';
import { updateSalePlatformMock } from './mocks/update-sale-platform.mock';
import { platformMock } from './mocks/platform.mock';
import { returnDeleteMock } from './../../../mocks/return-delete.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SalePlatformsService', () => {
  let service: SalePlatformsService;
  let repository: Repository<SalePlatform>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalePlatformsService,
        {
          provide: getRepositoryToken(SalePlatform),
          useValue: {
            find: jest.fn().mockResolvedValue([platformMock]),
            findOneOrFail: jest.fn().mockResolvedValue(platformMock),
            findOneByOrFail: jest.fn().mockResolvedValue(platformMock),
            create: jest.fn().mockReturnValue(platformMock),
            save: jest.fn().mockResolvedValue(platformMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<SalePlatformsService>(SalePlatformsService);
    repository = module.get<Repository<SalePlatform>>(
      getRepositoryToken(SalePlatform),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a platform', async () => {
      jest.spyOn(service, 'findOneByName').mockResolvedValueOnce(undefined);

      const platform = await service.create(createSalePlatformMock);

      expect(platform).toEqual(platformMock);
      expect(repository.save).toHaveBeenCalledWith(platformMock);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(service.findOneByName).toHaveBeenCalledTimes(1);
    });

    it('should return an error', async () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.create(createSalePlatformMock)).rejects.toThrow(Error);
    });

    it('should throw BadRequestException if platform already exists', async () => {
      jest.spyOn(service, 'findOneByName').mockResolvedValueOnce(platformMock);
      await expect(service.create(createSalePlatformMock)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of platforms', async () => {
      const platforms = await service.findAll();

      expect(platforms).toEqual([platformMock]);
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      const platforms = await service.findAll();

      expect(platforms).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a platform', async () => {
      const platform = await service.findOne(platformMock.id);

      expect(platform).toEqual(platformMock);
    });

    it('should return an error', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findOne(platformMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findOneByName', () => {
    it('should return a platform', async () => {
      const result = await service.findOneByName(platformMock.name);
      expect(result).toEqual(platformMock);
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
    it('should update a platform', async () => {
      const result = await service.update(
        platformMock.id,
        updateSalePlatformMock,
      );

      expect(result).toEqual(platformMock);
    });

    it('should throw NotFoundException if platform is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(
        service.update(platformMock.id, updateSalePlatformMock),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a platform', async () => {
      const result = await service.remove(platformMock.id);
      expect(result).toEqual(returnDeleteMock);
    });

    it('should throw NotFoundException if platform is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.remove(platformMock.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
